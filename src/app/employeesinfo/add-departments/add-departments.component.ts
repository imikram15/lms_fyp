import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DepartmentsService } from '../../services/departments.service';
DepartmentsService

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrl: './add-departments.component.scss'
})
export class AddDepartmentsComponent implements OnInit {

  departmentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,  private departmentsService:DepartmentsService) { }
  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  errors:any =[];

  onSubmit(): void {
    this.departmentsService.saveDepartment(this.departmentForm.value).subscribe({
      next:(res:any)=>{
        console.log(res,'response'); 
        this.departmentForm.reset();       
      },
      error:(err:any)=>{
        this.errors = err.error.errors;
        console.log(err);        
      }
    });
   }
 
}