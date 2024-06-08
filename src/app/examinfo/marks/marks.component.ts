import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { Paginator } from '../../paginator';
import { ToasterService } from '../../services/toastr.service';
import { MarksService } from '../../services/marks.service';
NgModel

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrl: './marks.component.scss'
})
export class MarksComponent extends Paginator implements OnInit {

  
  isLoading: boolean = false;
  marks: any[] = [];
  searchForm!: FormGroup;
  uploadForm!: FormGroup;
  classes: any;
  examCategories: any;
  subjects: any;

  constructor(
    private marksService: MarksService,
    private fb: FormBuilder,
    private toastr: ToasterService,
    public dialog: MatDialog,
  ) {
    super();
    this.searchForm = this.fb.group({
      class_id: ['', Validators.required],
      examCategory_id: ['', Validators.required],
      subject_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getClassesList();
    this.getExamCategoriesList();
    this.getSubjectsList();
  }

  getClassesList() {
    this.marksService.getclasses().subscribe(
      (res: any) => {
        this.classes = res.classes.data;
      },
      (error: any) => {
        console.error('Error fetching classes:', error);
        this.toastr.showError('Failed to fetch classes. Please try again later.', 'Error');
      }
    );
  }

  getExamCategoriesList() {
    this.marksService.getExamCategory().subscribe(
      (res: any) => {
        this.examCategories = res.examCategory.data;
      },
      (error: any) => {
        console.error('Error fetching exam categories:', error);
        this.toastr.showError('Failed to fetch exam categories. Please try again later.', 'Error');
      }
    );
  }

  getSubjectsList() {
    this.marksService.getSubjects().subscribe(
      (res: any) => {
        this.subjects = res.subjects.data;
      },
      (error: any) => {
        console.error('Error fetching subjects:', error);
        this.toastr.showError('Failed to fetch subjects. Please try again later.', 'Error');
      }
    );
  }

  searchMarks() {
    const searchData = {
      class_id: this.searchForm.get('class_id')?.value,
      examCategory_id: this.searchForm.get('examCategory_id')?.value,
      subject_id: this.searchForm.get('subject_id')?.value,
    };

    this.isLoading = true;
    if (this.searchForm.invalid) {
      this.toastr.showError('Please fill in all required fields.', 'Error');
      this.isLoading = false;
      return;
    }

    this.marksService.getMarks(searchData).pipe(
      catchError(err => {
        console.error('Error fetching marks:', err);
        this.toastr.showError('No marks found for the specified criteria.', 'Error');
        this.isLoading = false;
        return throwError(err);
      })
    ).subscribe(
      (data: any) => {       
        this.marks = data.marks;
        this.isLoading = false;
      }
    );
  }

  saveMark(mark: any) {
    console.log(mark.mark_id);
    if (mark.mark_id) {
      
      this.updateMark(mark);
    } else {
    console.log(mark);      
      this.createMark(mark);
    }
  }

  createMark(mark: any) {
    const payload = {
      class_id: mark.class.id,
      examCategory_id: mark.examCategory.id,
      subject_id: mark.subject.id,
      mark: mark.mark,
      comment: mark.comment,
      student_id: mark.student.id,
    };
    this.marksService.storeMark(payload).pipe(
      catchError(err => {
        console.error('Error uploading mark:', err);
        this.toastr.showError('Failed to upload mark. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe(
      (res: any) => {
        this.toastr.showSuccess('Mark recorded successfully.', 'Success');
        // this.searchMarks();
      }
    );
  }

  updateMark(mark: any) {
    const payload = {
      id: mark.mark_id,
      class_id: mark.class.id,
      examCategory_id: mark.examCategory.id,
      subject_id: mark.subject.id,
      mark: mark.mark,
      comment: mark.comment,
      student_id: mark.student.id,
    };
    this.marksService.updateMark(payload).pipe(
      catchError(err => {
        console.error('Error updating mark:', err);
        this.toastr.showError('Failed to update mark. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe(
      (res: any) => {
        this.toastr.showSuccess('Mark updated successfully.', 'Success');
        // this.searchMarks();
      }
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  
}
