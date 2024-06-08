import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';
import { ExamCategoryService } from '../../services/exam-category.service';

@Component({
  selector: 'app-add-exam-category',
  templateUrl: './add-exam-category.component.html',
  styleUrl: './add-exam-category.component.scss'
})
export class AddExamCategoryComponent {
  
  ExamCategoryForm!:FormGroup
  errors: any = [];
  forUpdate:boolean = false;
  examCategoryID:any;
  examCategoryUpdate:any;
  

  constructor(private fb: FormBuilder,
    private ExamCategoryService: ExamCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService,) { }

  ngOnInit(){
    this.ExamCategoryForm = this.fb.group({
      title:['', Validators.required]
    });
    this.examCategoryID = this.route.snapshot.paramMap.get('id');    
    if (this.examCategoryID) {
      this.ExamCategoryService.getExamCategory(this.examCategoryID).subscribe((res: any) => {
        if (res.examCategory && res.examCategory.id) {          
          this.forUpdate = true;
          this.examCategoryUpdate = res.examCategory;
          this.ExamCategoryForm.patchValue({
            title: this.examCategoryUpdate.title,
          })
        } else {
          this.toastr.showError('Exam Category data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching Exam Category data:', error);
      });
    }
  }
  
  onSubmit() {
    const formData = this.ExamCategoryForm.value;

    if (this.forUpdate) {
      this.ExamCategoryService.updateExamCategory(this.examCategoryID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.ExamCategoryForm.reset();
          this.router.navigate(['/exam-category'])
          this.toastr.showSuccess('Exam Category updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.ExamCategoryService.SaveExamCategory(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.ExamCategoryForm.reset();
          this.router.navigate(['/exam-category']);
          this.toastr.showSuccess('Exam  Category added Successfully!', 'Success');

        },
        error: (err: any) => {
          this.handle422Error(err);
          console.log(err);
        }
      });
    }
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
