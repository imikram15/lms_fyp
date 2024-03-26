import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-class-routine',
  templateUrl: './class-routine.component.html',
  styleUrl: './class-routine.component.scss'
})
export class ClassRoutineComponent implements OnInit {
  studentForm: FormGroup;
  sections: string[] = ['A', 'B', 'C'];
  classes: string[] = ['Class 1', 'Class 2', 'Class 3'];
  classRoutines: any[] = [
    { date: '2024-03-25', weekday: 'Monday', time: '9:00 - 10:00', teacher: 'Mr. Johnson', room: 'Room 1', subject: 'Math' },
    { date: '2024-03-25', weekday: 'Monday', time: '10:00 - 11:00', teacher: 'Ms. Smith', room: 'Room 2', subject: 'English' },
    { date: '2024-03-25', weekday: 'Monday', time: '11:00 - 12:00', teacher: 'Mr. Brown', room: 'Room 3', subject: 'Science' },
    { date: '2024-03-26', weekday: 'Tuesday', time: '9:00 - 10:00', teacher: 'Mr. Green', room: 'Room 1', subject: 'History' },
    { date: '2024-03-26', weekday: 'Tuesday', time: '10:00 - 11:00', teacher: 'Ms. White', room: 'Room 2', subject: 'Geography' },
    { date: '2024-03-26', weekday: 'Tuesday', time: '11:00 - 12:00', teacher: 'Mr. Black', room: 'Room 3', subject: 'Physics' },
    { date: '2024-03-27', weekday: 'Wednesday', time: '9:00 - 10:00', teacher: 'Ms. Blue', room: 'Room 1', subject: 'Chemistry' },
    { date: '2024-03-27', weekday: 'Wednesday', time: '10:00 - 11:00', teacher: 'Mr. Yellow', room: 'Room 2', subject: 'Biology' },
    { date: '2024-03-27', weekday: 'Wednesday', time: '11:00 - 12:00', teacher: 'Ms. Orange', room: 'Room 3', subject: 'Art' },
    // Add more routines for other weekdays as needed
  ];

  
  filteredData: any[] = [];
  groupedData: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      section: [''],
      class: ['']
    });
  }

  ngOnInit(): void {
  }

  filterData() {
    const selectedSection = this.studentForm.get('section')?.value;
    const selectedClass = this.studentForm.get('class')?.value;

    this.filteredData = this.classRoutines.filter(item =>
      (!selectedSection || item.section === selectedSection) &&
      (!selectedClass || item.class === selectedClass)
    );

    this.groupDataByWeekday();
  }

  groupDataByWeekday() {
    const groupedObj = this.filteredData.reduce((acc, curr) => {
      if (!acc[curr.weekday]) {
        acc[curr.weekday] = [];
      }
      acc[curr.weekday].push(curr);
      return acc;
    }, {});

    this.groupedData = Object.keys(groupedObj).map(key => ({ weekday: key, routines: groupedObj[key] }));
  }
}
