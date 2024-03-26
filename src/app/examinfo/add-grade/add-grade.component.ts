import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrl: './add-grade.component.scss'
})
export class AddGradeComponent {
  gradeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.gradeForm = this.formBuilder.group({
          grade: ['', Validators.required],
          gradePoint: ['', Validators.required],
          markFrom: ['', Validators.required],
          markUpto: ['', Validators.required]
      });
  }

  onSubmit(): void {
      // Submit logic here
  }
}
