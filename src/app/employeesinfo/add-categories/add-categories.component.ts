import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.scss'
})
export class AddCategoriesComponent {

  categoryForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }
  
  onSubmit() {
  throw new Error('Method not implemented.');
  }
  
}
