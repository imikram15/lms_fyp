import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  studentForm!: FormGroup;
  classOptions: string[] = ['Class 1', 'Class 2', 'Class 3']; // Example options

  // Dummy data for testing
  classSubjects: any[] = [
    { name: 'English' },
    { name: 'Mathematics' },
    { name: 'Computer' },
    // Add more subjects as needed
  ];

  showTable: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      class: ['']
    });
  }

  filterData() {
    // Implement your filtering logic here
    // For now, just show the table with dummy data
    this.showTable = true;
  }
}
