import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toastr.service';
import { ClassRoutinesService } from '../../services/class-routines.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-class-routine',
  templateUrl: './class-routine.component.html',
  styleUrl: './class-routine.component.scss'
})
export class ClassRoutineComponent implements OnInit {

  classroutineForm!: FormGroup; 
  isLoading: boolean = false;
  classes: any[] = [];
  classRoutines: any[] = [];
  groupedData: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private toastr: ToasterService,
    private classRoutineService: ClassRoutinesService,
    public dialog: MatDialog,
    public commonService:CommonService
  ) {
    this.classroutineForm = this.formBuilder.group({
      class_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {  
    this.loadClasses(); 
  }

  loadClasses() {
    this.classRoutineService.getClasses().pipe(
      catchError(err => {
        console.error('Error fetching classes:', err);
        this.toastr.showError('Failed to load classes. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.classes = data.classes.data;    
    });
  }

  filterData() {
    this.isLoading = true;
    if (this.classroutineForm.invalid) {
      this.toastr.showError('Please fill all the required fields.', 'Error');
      this.isLoading = false;
      return;
    }
    const selectedClass = this.classroutineForm.get('class_id')?.value;

    if (selectedClass) {
      this.classRoutineService.getRoutines(selectedClass).pipe(
        catchError(err => {
          console.error('Error fetching class routines:', err);
          this.toastr.showError('Failed to load class routines. Please try again later.', 'Error');
          this.isLoading = false;
          return throwError(err);

        })
      ).subscribe((data: any) => {
        console.log( data.routines);        
        this.classRoutines = data.routines;
        this.groupDataByWeekday();
        this.isLoading = false;
      });
    }
  }
  
  
  groupDataByWeekday() {
    const groupedObj = this.classRoutines.reduce((acc, curr) => {
      const key = `${curr.id}-${curr.day}-${curr.startinghours}-${curr.startingminute}-${curr.endinghours}-${curr.endingminute}-${curr.classroom}-${curr.teacher}-${curr.subject}`;
      
      if (!acc[curr.day]) {
        acc[curr.day] = {};
      }
  
      if (!acc[curr.day][key]) {
        acc[curr.day][key] = {
          startinghours: curr.startinghours,
          startingminute: curr.startingminute,
          endinghours: curr.endinghours,
          endingminute: curr.endingminute,
          classroom: curr.classrooms,
          teacher: curr.teachers,
          subject: curr.subjects,
          id: curr.id,
        };
      }
  
      return acc;
    }, {});
  
    this.groupedData = Object.keys(groupedObj).map(key => ({
      weekday: key,
      routines: Object.values(groupedObj[key])
    }));
  }
  
  formatTime(hours: number, minutes: number): string {
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  
  result: string = '';

  confirmDialog(id:string|number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: {data : dialogData , id:id, loc:'classRoutine'},
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
       this.filterData();
    });
  }
}
