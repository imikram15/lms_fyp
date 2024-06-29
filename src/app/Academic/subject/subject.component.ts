import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectResponse, SubjectsService } from '../../services/subjects.service';
import { ToasterService } from '../../services/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from '../../paginator';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { catchError, throwError } from 'rxjs';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent  extends Paginator{

 
  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  subjects: SubjectResponse[] = []; 
  subjectForm!:FormGroup;
  selectedClass: any;
  classes:any;
  deletecheck:boolean = false;
  member_type:any;
  member_id:any;

  constructor(private subjectService:SubjectsService,
    private fb:FormBuilder,
    private toastr:ToasterService,
    public dialog: MatDialog,
    public commonService:CommonService){
    super();
    this.member_type = localStorage.getItem('member_type');
    this.member_id = localStorage.getItem('member_id');
    this.subjectForm = this.fb.group({
      class_id: [''],
    });
    
       this.setClassIdValidator();
  }
    
    ngOnInit(){
      if (this.member_type == 'students') {
        this.loadSubjects();        
        }else{
        this.getSubjectsList();      
        this.getClassesList();
      }
    }
    

    getClassesList() {
      this.subjectService.getClasses().subscribe((res: any) => {
        this.classes = res.classes.data;          
      },
      (error: any) => {
        console.error('Error fetching Classes:', error);
        this.toastr.showError('Failed to fetch Classes. Please try again later.','Error');
      }
      )
    }
  
   setClassIdValidator() {
    const classIdControl = this.subjectForm.get('class_id');
    if (classIdControl) {
      if (this.member_type !== 'students') {
        classIdControl.setValidators([Validators.required]);
      } else {
        classIdControl.clearValidators();
      }
      classIdControl.updateValueAndValidity();
    }
  }

    getSubjectsList() {
      this.isLoading = true;
      this.subjectService.getPaginatedSubjects(this.page, this.perPage).subscribe((res: any) => {             
        this.subjects = res.subjects.data;
        this.page = res.subjects.current_page;
        this.total = res.subjects.total; 
        this.perPage = res.subjects.per_page;              
        this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching Subjects:', error);
          this.toastr.showError('Failed to fetch Subject. Please try again later.','Error');
          this.isLoading = false; 
        }
      );
    }
    

    loadSubjectsByClass() {
      this.isLoading = true;
      if (this.subjectForm.invalid) {
        this.toastr.showError('Please select a class and date', 'Error');
        return;
      }   
      this.selectedClass = this.subjectForm.get('class_id')?.value;
      if (this.selectedClass) {
        this.subjectService.getSubjectsByClass(this.selectedClass).pipe(
          catchError(err => {
            console.error('Error fetching subjects:', err);
            this.toastr.showError('No subjects Found For this Class.', 'Error');
            this.isLoading = false;
            return throwError(err);
          })
        ).subscribe(data => {
          this.subjects = data.subjects;
          this.isLoading = false;
                      
        });
      }
      this.deletecheck = true;
    }

    loadSubjects(): void {
    if (this.member_type && this.member_id) {
      this.subjectService.filterSubjectsByType(this.member_type, this.member_id).pipe(
        catchError(err => {
          console.error('Error fetching subjects:', err);
          this.toastr.showError('Failed to load subjects. Please try again later.', 'Error');
          return throwError(err);
        })
      ).subscribe((data: any) => {
        this.subjects = data.subjects;
      });
    }
  }


    onTableDataChange(event:any){
      this.page = event;
      console.log(this.page);  
      this.getSubjectsList();
      }


      result: string = '';

      confirmDialog(id:string|number): void {
        const message = `Are you sure you want to do this?`;
    
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
    
        const dialogRef = this.dialog.open(ConfirmComponent, {
          width: "35%",
          data: {data : dialogData , id:id, loc:'subject'},
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;
          if (this.deletecheck === true) {
            this.loadSubjectsByClass();
          }else {
            this.getSubjectsList();
          }
        });
      }


}
