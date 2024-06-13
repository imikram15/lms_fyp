import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toastr.service';
import { AttendanceService } from '../../services/attendance.service';
import { catchError, throwError } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent  {
  
  attendanceForm: FormGroup;  
  isLoading: boolean = false;
  classes: any[] = [];
  students: any[] = [];
  attendanceData: any[] = [];
  attendanceDates: any[] = [];
  status :any;
  selectedClass:any;
  baseURL = environment.apiUrl;
  daysInMonth: string[] = [];
  months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];
  years: number[] = [];

  constructor(private fb: FormBuilder, 
    private toastr:ToasterService,
    private attendanceService:AttendanceService,
    public commonService:CommonService) {
      
      const currentDate = new Date();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');      
      const currentYear = currentDate.getFullYear();

    this.attendanceForm = this.fb.group({
      class_id: ['', Validators.required],
      month: [currentMonth],
      year: [currentYear]
    });

    for (let year = currentYear; year >= 2022; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadStatus();
  }
  loadClasses() {
    this.attendanceService.getClasses().pipe(
      catchError(err => {
        console.error('Error fetching classes:', err);
        this.toastr.showError('Failed to load classes. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe(data => {
      this.classes = data.classes.data;
    });
  }
  
  loadStudents() {
    this.isLoading = true;
    if (this.attendanceForm.invalid) {
      this.toastr.showError('Please select a class and date', 'Error');
      return;
    }   
    this.selectedClass = this.attendanceForm.get('class_id')?.value;
    if (this.selectedClass) {
      this.attendanceService.getStudents(this.selectedClass).pipe(
        catchError(err => {
          console.error('Error fetching students:', err);
          this.toastr.showError('No Students Found For this Class.', 'Error');
          this.isLoading = false;
          return throwError(err);
        })
      ).subscribe(data => {
        this.students = data.students;
        this.loadAttendance();       
      });
    }
    
  }
 
  loadStatus(){
    this.attendanceService.getAttendanceStatus().pipe(
      catchError(err => {
        console.error('Error fetching attendance status:', err);
        this.toastr.showError('Failed to fetch attendance status. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe(res => {
      this.status = res.data;
    });
  }

  loadAttendance() {    
    const selectedClass = this.attendanceForm.get('class_id')?.value;
    const selectedmonth = this.attendanceForm.get('month')?.value;
    const selectedyear = this.attendanceForm.get('year')?.value;
    console.log(selectedClass, selectedmonth, selectedyear);

    if (selectedClass && selectedmonth && selectedyear ) {
      this.attendanceService.getAttendance(selectedClass, selectedmonth, selectedyear).subscribe(res => {
        this.attendanceData = res.data;
        this.attendanceDates = res.dates;    
      });
    }
    this.isLoading = false;
  }

  checkAttendanceDate(headdate:any, bodyDate:any){
    const date = new Date(bodyDate);
    
    const day = date.getDate();
    const dayString = day < 10 ? '0' + day : day.toString();
    // console.log(headdate,dayString,headdate==dayString);
    if(headdate == dayString){
      return true
    }
  return false
  }

  getAttendence(day:any,arr:any){
    let res = '-'
    const len = arr.length;
    let i  = 0
    while (i<len){
      if(this.checkAttendanceDate(day,arr[i].date)){
        // console.log('arr',arr[i].attendance_status.title);
        res =  arr[i].attendance_status.title
        break;
      }
      if(i==len){
        break;
      }else{
        i++
      }
    }
    
    return res
  }
  getMonth(mon:string){
    let month = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];
    return month[Number(mon)-1];
  }
  generateDaysInMonth(year: number, month: number) {
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      this.daysInMonth.push(date.getDate().toString());
      date.setDate(date.getDate() + 1);
    }
  }
  

}