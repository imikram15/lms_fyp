import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-class-routine',
  templateUrl: './add-class-routine.component.html',
  styleUrl: './add-class-routine.component.scss'
})
export class AddClassRoutineComponent {
classroomOptions: any;
sectionOptions: any;
subjectOptions: any;
teacherOptions: any;
dayOptions: any;
hourOptions: any;
minuteOptions: any;

onSubmit() {
throw new Error('Method not implemented.');
}
  routineForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.routineForm = this.formBuilder.group({
      classroomOptions: [],
      
    });
  }
}
