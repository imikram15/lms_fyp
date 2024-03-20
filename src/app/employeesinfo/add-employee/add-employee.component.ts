import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  departments: any;
  designations: any;
  categories: any;
  employeeForm!: FormGroup;
  
  constructor( private fb:FormBuilder){}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
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
