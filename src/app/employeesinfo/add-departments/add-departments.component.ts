import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrl: './add-departments.component.scss'
})
export class AddDepartmentsComponent {
departmentForm!: FormGroup;

constructor(private formBuilder: FormBuilder) { }
  
ngOnInit(): void {
  this.departmentForm = this.formBuilder.group({
    title: ['', Validators.required],
  });
}
onSubmit() {
throw new Error('Method not implemented.');
}

}
