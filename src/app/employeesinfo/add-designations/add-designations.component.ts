import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesignationsService } from '../../services/designations.service';

@Component({
  selector: 'app-add-designations',
  templateUrl: './add-designations.component.html',
  styleUrl: './add-designations.component.scss'
})
export class AddDesignationsComponent implements OnInit {

  designationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private designationsService:DesignationsService) { }

  ngOnInit(): void {
    this.designationForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  errors:any =[];

  onSubmit(): void {
    this.designationsService.saveDesignation(this.designationForm.value).subscribe({
      next:(res:any)=>{
        console.log(res,'response'); 
        this.designationForm.reset();       
      },
      error:(err:any)=>{
        this.errors = err.error.errors;
        console.log(err);        
      }
    });
   }
   
}