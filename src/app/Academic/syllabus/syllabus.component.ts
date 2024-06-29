import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toastr.service';
import { SyllabusService } from '../../services/syllabus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment.development';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrl: './syllabus.component.scss'
})
export class SyllabusComponent {
  syllabusForm:FormGroup;

  syllabusData: any[] = []; 
  isLoading: boolean = false;
  classes: any[] = [];
  subjects: any[] = [];  
  fileUrl = environment.mediaUrl2;

  member_type:any;
  member_id:any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToasterService,
    private syllabusService: SyllabusService,   
    public dialog: MatDialog,
    public commonService:CommonService
  ) {
    this.member_type = localStorage.getItem('member_type');
    this.member_id = localStorage.getItem('member_id');
    this.syllabusForm = this.fb.group({
      class_id: ['']
      });
    this.setClassIdValidator();
  }
  ngOnInit(): void {  
    if (this.member_type == 'students') {
      this.loadSyllabus();      
      } else if(this.member_type == 'teachers')
      this.loadClassesByType();      
      else{
      this.loadClasses(); 
    }    
  }

  loadClassesByType() {
    this.syllabusService.getClassesByType( this.member_type,this.member_id,).pipe(
      catchError(err => {
        console.error('Error fetching classes:', err);
        this.toastr.showError('Failed to load classes. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe(data => {     
      this.classes = data.classes;
    });
  }

 setClassIdValidator() {
    const classIdControl = this.syllabusForm.get('class_id');
    if (classIdControl) {
      if (this.member_type !== 'students') {
        classIdControl.setValidators([Validators.required]);
      } else {
        classIdControl.clearValidators();
      }
      classIdControl.updateValueAndValidity();
    }
  }

  loadClasses() {
    this.syllabusService.getClasses().pipe(
      catchError(err => {
        console.error('Error fetching classes:', err);
        this.toastr.showError('Failed to load classes. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.classes = data.classes.data;    
    });
  }
  
    loadSyllabus(): void {
    this.isLoading = true;
    if (this.member_type && this.member_id) {
      this.syllabusService.filterSyllabusByType(this.member_type, this.member_id).pipe(
        catchError(err => {
          console.error('Error fetching syllabuses:', err);
          this.toastr.showError('Failed to load syllabuses. Please try again later.', 'Error');
          this.isLoading = false;
          return throwError(err);
        })
      ).subscribe((data: any) => {
        this.syllabusData = data.syllabus.data;
      this.isLoading = false;
      });
    }
  }

  filterData() {
    this.isLoading = true;
    if (this.syllabusForm.invalid) {
      this.toastr.showError('Please fill all the required fields.', 'Error');
      this.isLoading = false;
      return;
    }
    const selectedClass = this.syllabusForm.get('class_id')?.value;

    if (selectedClass) {
      this.syllabusService.getSyllabusByClass(selectedClass).pipe(
        catchError(err => {
          console.error('Error fetching Syllabus:', err);
          this.toastr.showError('Failed to load Syllabus. Please try again later.', 'Error');
          this.isLoading = false;
          return throwError(err);

        })
      ).subscribe((data: any) => {
        this.syllabusData = data.syllabus.data;
        console.log( data.syllabus);        
        this.isLoading = false;
      });
    }
  }
  result: string = '';

  confirmDialog(id:string|number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: {data : dialogData , id:id, loc:'Syllabus'},
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
       this.filterData();
    });
  }
  
}
