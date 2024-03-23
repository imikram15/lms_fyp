import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent  {
  studentForm: FormGroup;
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  years: number[] = [2020, 2021, 2022, 2023, 2024, 2025];
  sections: string[] = ["A", "B", "C"];
  classes: string[] = ["Class 1", "Class 2", "Class 3","Class 4", "Class 5", "Class 6","Class 7", "Class 8", "Class 9","Class 10"];
  students: string[] = ["Student 1", "Student 2", "Student 3"];

  // Dummy data for testing
  dummyData: any[] = [
    { date: '01', 'Student 1': 'Present', 'Student 2': 'Absent', 'Student 3': 'Present' },
    { date: '02', 'Student 1': 'Absent', 'Student 2': 'Present', 'Student 3': 'Present' },
    { date: '03', 'Student 1': 'Present', 'Student 2': 'Present', 'Student 3': 'Absent' },
    { date: '04', 'Student 1': 'Present', 'Student 2': 'Absent', 'Student 3': 'Present' },
    { date: '05', 'Student 1': 'Absent', 'Student 2': 'Present', 'Student 3': 'Present' },
    { date: '06', 'Student 1': 'Present', 'Student 2': 'Present', 'Student 3': 'Absent' },
    { date: '07', 'Student 1': 'Present', 'Student 2': 'Absent', 'Student 3': 'Present' },
    { date: '08', 'Student 1': 'Absent', 'Student 2': 'Present', 'Student 3': 'Present' },
    { date: '09', 'Student 1': 'Present', 'Student 2': 'Present', 'Student 3': 'Absent' },
    { date: '10', 'Student 1': 'Present', 'Student 2': 'Absent', 'Student 3': 'Present' },

    // Add more dummy data as needed
  ];

  filteredData: any[] = [];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      month: [''],
      year: [''],
      section: [''],
      class: ['']
    });
  }

  filterData() {
    const selectedMonth = this.studentForm.get('month')?.value;
    const selectedYear = this.studentForm.get('year')?.value;
    const selectedSection = this.studentForm.get('section')?.value;
    const selectedClass = this.studentForm.get('class')?.value;

    this.filteredData = this.dummyData.filter(item =>
      (!selectedMonth || item.date.includes(selectedYear + '-' + selectedMonth)) &&
      (!selectedSection || item.section === selectedSection) &&
      (!selectedClass || item.class === selectedClass)
    );
  }

  onSubmit() {
    // Implement your form submission logic here
  }
}