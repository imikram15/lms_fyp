import { Component } from '@angular/core';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrl: './syllabus.component.scss'
})
export class SyllabusComponent {
  classOptions: string[] = ['Class 1', 'Class 2', 'Class 3'];
  sectionOptions: string[] = ['Section A', 'Section B', 'Section C'];
  showTable: boolean = false; // Flag to show/hide the table
  syllabusData: any[] = []; // Array to store syllabus data

  filterData(): void {
    // Dummy data for the table
    this.syllabusData = [
      { title: 'First term', subject: 'Mathematics' },
      { title: 'Second term', subject: 'Computer' },
      { title: 'Third term', subject: 'Chemistry' }
    ];

    this.showTable = true; // Show the table
  }
}
