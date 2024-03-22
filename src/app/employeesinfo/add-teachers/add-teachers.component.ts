import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html',
  styleUrl: './add-teachers.component.scss'
})
export class AddTeachersComponent {
  
  departments: any;
  designations: any;
  categories: any;
  teacherForm!: FormGroup;
  
  constructor( private fb:FormBuilder){}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      department_id: ['', Validators.required],
      designation_id: ['', Validators.required],
      category_id: ['', Validators.required],
      name: ['', Validators.required],
      father_name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      joining_date: ['', Validators.required],
      address: ['', Validators.required]
    });

  }
onSubmit() {}
}
