import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ToasterService } from '../../services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.scss'
})
export class AddCategoriesComponent implements OnInit {
  categoryForm!: FormGroup;
  forUpdate: boolean = false;
  categoryID!: any;
  categoryUpdate: any;

  constructor(private formBuilder: FormBuilder, 
    private categoriesService:CategoriesService,
    private toastr:ToasterService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: ['', Validators.required],
    });

    this.categoryID = this.route.snapshot.paramMap.get('id');
    if (this.categoryID) {
      this.categoriesService.getCategory(this.categoryID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.categoryUpdate = res;
          this.categoryForm.patchValue({
            category_id: this.categoryUpdate.category_id,
            title: this.categoryUpdate.title,
          })
        } else {
        this.toastr.showError('Category data not found or invalid format', 'Error');          
        }
      }, error => {
        this.toastr.showError('Error fetching Category data', error);  
      });
    }
  }

  errors: any = [];

  onSubmit(): void {

    const formData = this.categoryForm.value;

    if (this.forUpdate) {
      this.categoriesService.updateCategory(this.categoryID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.categoryForm.reset();
          this.router.navigate(['/categories'])
          this.toastr.showSuccess('Category updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.categoriesService.saveCategories(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.categoryForm.reset();
          this.router.navigate(['/categories']);
       this.toastr.showSuccess('Category added successfully!', 'Success');

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
