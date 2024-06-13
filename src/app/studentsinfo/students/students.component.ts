import { Component, ViewChild } from '@angular/core';
import {  StudentsService } from '../../services/students.service';
import { Paginator } from '../../paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { environment } from '../../../environments/environment.development';
import { ToasterService } from '../../services/toastr.service';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent extends Paginator{

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  students: any;
  imgUrl = environment.mediaUrl;
  classes:any;
  searchForm!:FormGroup;

  constructor(private studentsService:StudentsService,
    public dialog: MatDialog,
    private toastr:ToasterService,
    public commonService:CommonService,
    private formBuilder: FormBuilder,  ){
    super();
    this.searchForm = this.formBuilder.group({
      class_id: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.getStudentsList();
    this.getClassesList();
  }

  getClassesList() {
    this.studentsService.getClasses().subscribe((res: any) => {
      this.classes= res.classes.data;      
    },
    (error: any) => {
      console.error('Error fetching Categories:', error);
      this.toastr.showError('Failed to fetch Categories. Please try again later.','Error');
    }
    )
  }

  selectClass(classId: string) {
    this.searchForm.get('class_id')?.setValue(classId);
    this.filterData();
  }

  filterData() {
    this.isLoading = true;
    if (this.searchForm.invalid) {
      this.toastr.showError('Please fill all the required fields.', 'Error');
      this.isLoading = false;
      return;
    }
    const selectedClass = this.searchForm.get('class_id')?.value;

    if (selectedClass) {
      this.studentsService.getStudentsByClass(selectedClass).pipe(
        catchError(err => {
          console.error('Error fetching Students:', err);
          this.toastr.showError('Failed to load Students. Please try again later.', 'Error');
          this.isLoading = false;
          return throwError(err);

        })
      ).subscribe((data: any) => {
        console.log( data);        
        this.students = data.students;
        this.isLoading = false;
      });
    }
  }

  getStudentsList(){{
    this.isLoading = true;
    this.studentsService.getPaginatedStudents(this.page, this.perPage).subscribe((res: any) => {
      this.students = res.students.data;
      console.log(res.students.data[0].classes.title);      
      this.page = res.students.current_page;
      this.total = res.students.total; 
      this.perPage = res.students.per_page;
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching classes:', error);
      this.toastr.showError('Failed to fetch Class. Please try again later.','Error');
      this.isLoading = false; 
    }
    )
  }}
  
 
 
  result: string = '';

  confirmDialog(id:string|number): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: {data : dialogData , id:id, loc:'student'},
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.getStudentsList();
    });
  }

  onTableDataChange(event:any){
    this.page = event;
    console.log(this.page);  
    this.getStudentsList();
    }
  

}
