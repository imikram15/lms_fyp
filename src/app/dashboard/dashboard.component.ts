import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(){
    // const id1 = localStorage.getItem('role_id');    
    // console.log('role id:' ,id1);
  }
  totalStudents = 20;
  totalTeachers = 10;
  totalParents = 18;
  totalStaff = 26;
  todaysAttendance = 430;

  attendanceData = [
    { day: 'One', value: 430 },
    { day: 'Two', value: 200 },
    { day: 'Three', value: 300 },
    { day: 'Four', value: 150 },
    { day: 'Five', value: 250 },
    { day: 'Six', value: 350 },
    { day: 'Seven', value: 400 },
    { day: 'Eight', value: 300 },
    { day: 'Nine', value: 100 },
    { day: 'Ten', value: 50 }
  ];
}
