import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrl: './marks.component.scss'
})
export class MarksComponent {

  studentForm: FormGroup;
  examOptions: string[] = ['First term', 'Second term', 'Third term'];
  classOptions: string[] = ['Class 1', 'Class 2', 'Class 3'];
  subjectOptions: string[] = ['English', 'physics', 'Mathematics'];
  sectionOptions: string[] = ['Section A', 'Section B', 'Section C'];
  filteredData: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      selectExam: [''],
      selectClass: [''],
      selectSubject: [''],
      selectSection: ['']
    });
  }

  ngOnInit(): void {
  }

  filterData() {
    // Simulated data for demonstration
    this.filteredData = [
      { name: 'John Doe', marks: 85, grade: 'A', comment: 'Well done!' },
      { name: 'Jane Smith', marks: 92, grade: 'A+', comment: 'Excellent!' },
      { name: 'Alice Johnson', marks: 78, grade: 'B', comment: 'Good effort!' }
    ];
  }
}
