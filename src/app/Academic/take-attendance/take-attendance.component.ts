import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toastr.service';
import { AttendanceService } from '../../services/attendance.service';
import { environment } from '../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrl: './take-attendance.component.scss'
})
export class TakeAttendanceComponent {
   
  attendanceForm: FormGroup;  
  isLoading: boolean = false;
  classes: any[] = [];
  students: any[] = [];
  attendanceData: any[] = [];
  status :any;
  selectedClass:any;
  imgUrl = environment.mediaUrl;
  formattedDate: any;
  
  constructor(private fb: FormBuilder, 
    private toastr:ToasterService,
    private attendanceService:AttendanceService,
    private router: Router,) {

    this.attendanceForm = this.fb.group({
      class_id: ['', Validators.required],
      date: ['', Validators.required],
    });
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
    ).subscribe((data: { classes: { data: any[]; }; }) => {
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
          return throwError(err);
        })
      ).subscribe(data => {
        this.students = data.students;
        this.initializeAttendanceData();
        this.isLoading = false;
      });
    }
    
  }

  
  initializeAttendanceData() {
    const defaultStatusId = this.status.length > 0 ? this.status[1].id : '2'; // Get the id of the second status option
    this.attendanceData = this.students.map(student => ({
      student_id: student.id,
      status: defaultStatusId 
    }));
  }

  loadStatus() {
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

  getAttendanceStatus(studentId: number): string {
    const record = this.attendanceData.find(record => record.student_id === studentId);
    return record ? record.status : '2';
  }

  setAttendanceStatus(studentId: number, status: string) {
    const record = this.attendanceData.find(record => record.student_id === studentId);
    if (record) {
      record.status = status;
    } else {
      this.attendanceData.push({ student_id: studentId, status });
    }
  }

  
submitAttendance() {
  if (this.attendanceForm.invalid) {
    this.toastr.showError('Please select a class and date', 'Error');
    return;
  }

  const attendance = this.students.map(student => {
    const attendanceRecord = this.attendanceData.find(record => record.student_id === student.id);
    return {
      student_id: student.id,
      date: this.attendanceForm.get('date')?.value,
      status_id: attendanceRecord ? attendanceRecord.status : '2',
      class_id: this.selectedClass,
    };
  });

  this.attendanceService.updateAttendance(attendance).pipe(
    catchError(err => {
      console.error('Error updating attendance:', err);
      this.handle422Error(err); 
      return throwError(err);
    })
  ).subscribe({
    next: (response: any) => {
      this.router.navigate(['/attendance']);
      this.toastr.showSuccess('Attendance updated successfully', 'Success');
    },
    error: (err: any) => {
      console.error('Error in subscription:', err);
    }
  });
}

private handle422Error(err: any): void {
  if (err.status === 422 && err.error && err.error.errors) {
    const errorMessages = Object.values(err.error.errors).flat();
    errorMessages.forEach((message: any) => {
      this.toastr.showError(message, 'Error');
    });
  } else {
    this.toastr.showError('An unexpected error occurred. Please try again later.', 'Error');
  }
}
  
}
