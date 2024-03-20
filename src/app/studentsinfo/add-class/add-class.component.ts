import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.scss'
})
export class AddClassComponent {

 classForm!: FormGroup;

constructor(private formBuilder: FormBuilder) { }
  
ngOnInit(): void {
  this.classForm = this.formBuilder.group({
    title: ['', Validators.required],
  });
}
onSubmit() {
  console.log(this.classForm.value);
  
}

}
