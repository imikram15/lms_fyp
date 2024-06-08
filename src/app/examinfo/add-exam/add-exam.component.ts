import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ExamsService } from '../../services/exams.service';
import { ToasterService } from '../../services/toastr.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.scss'
})
export class AddExamComponent {
  forUpdate: boolean = false;
  examID: any;
  examUpdate: any;
  examForm: FormGroup; 
  isLoading: boolean = false;
  classes: any[] = [];
  subjects: any[] = [];
  examCategories: any[] = [];
  classrooms: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToasterService,
    private examsService: ExamsService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.examForm = this.fb.group({
      examCategory_id: ['', Validators.required],
      class_id: ['', Validators.required],
      subject_id: ['', Validators.required],
      classroom_id: ['', Validators.required],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_date: [''],
      end_time: [''],
      total_marks: ['', [Validators.required, Validators.min(0)]]
    });

    this.examID = this.route.snapshot.paramMap.get('id');
    if (this.examID) {
      this.isLoading = true;
      this.examsService.getExam(this.examID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.examUpdate = res;
          this.examForm.patchValue({
            examCategory_id: this.examUpdate.examCategory_id,
            class_id: this.examUpdate.class_id,
            subject_id: this.examUpdate.subject_id,
            classroom_id: this.examUpdate.classroom_id,
            start_date: this.examUpdate.start_date,
            start_time: this.examUpdate.start_time,
            end_date: this.examUpdate.end_date,
            end_time: this.examUpdate.end_time,
            total_marks: this.examUpdate.total_marks
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.toastr.showError('Exam data not found or invalid format:', res);
        }
      }, error => {
        this.isLoading = false;
        console.error('Error fetching Exam data:', error);
      });
    }
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadClassrooms();
    this.loadSubjects();
    this.loadExamCategories();
  }

  loadClasses() {
    this.examsService.getclasses().pipe(
      catchError(err => {
        console.error('Error fetching classes:', err);
        this.toastr.showError('Failed to load classes. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.classes = data.classes.data;
    });
  }

  loadClassrooms() {
    this.examsService.getClassrooms().pipe(
      catchError(err => {
        console.error('Error fetching classrooms:', err);
        this.toastr.showError('Failed to load classrooms. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.classrooms = data.classrooms.data;
    });
  }

  loadSubjects() {
    this.examsService.getSubjects().pipe(
      catchError(err => {
        console.error('Error fetching subjects:', err);
        this.toastr.showError('Failed to load subjects. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.subjects = data.subjects.data;
    });
  }

  loadExamCategories() {
    this.examsService.getExamCategory().pipe(
      catchError(err => {
        console.error('Error fetching exam categories:', err);
        this.toastr.showError('Failed to load exam categories. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.examCategories = data.examCategory.data;
    });
  }

  createExam() {
    const formData = this.examForm.value;
    if (this.examForm.invalid) {
      this.toastr.showError('Please fill all the required fields.', 'Error');
      this.isLoading = false;
      return;
    }

    const startDateTime = this.combineDateAndTime(formData.start_date, formData.start_time);
    const endDateTime = formData.end_date && formData.end_time ? this.combineDateAndTime(formData.end_date, formData.end_time) : null;
  
    formData.start_time = this.datePipe.transform(startDateTime, 'HH:mm:ss');
    formData.end_time = endDateTime ? this.datePipe.transform(endDateTime, 'HH:mm:ss') : null;
  

    if (this.forUpdate) {
      this.examsService.updateExam(this.examID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.examForm.reset();
          this.router.navigate(['/examination']);
          this.toastr.showSuccess('Exam updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.examsService.createExam(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.examForm.reset();
          this.router.navigate(['/examination']);
          this.toastr.showSuccess('Exam added successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    }
  }

  combineDateAndTime(date: string, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0, 0);
    return combinedDate;
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
