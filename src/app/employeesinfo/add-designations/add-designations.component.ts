import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-designations',
  templateUrl: './add-designations.component.html',
  styleUrl: './add-designations.component.scss'
})
export class AddDesignationsComponent {

  designationForm!: FormGroup;

constructor(private formBuilder: FormBuilder) { }
  
ngOnInit(): void {
  this.designationForm = this.formBuilder.group({
    title: ['', Validators.required],
  });
}
onSubmit() {
throw new Error('Method not implemented.');
}

}
