import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.scss'
})
export class AddCategoriesComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  errors:any =[];

  onSubmit(): void {
    this.categoriesService.saveCategories(this.categoryForm.value).subscribe({
      next:(res:any)=>{
        console.log(res,'response'); 
        this.categoryForm.reset();       
      },
      error:(err:any)=>{
        this.errors = err.error.errors;
        console.log(err);        
      }
    });
   }
   
}
