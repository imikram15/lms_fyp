import { Component } from '@angular/core';
import { EmployeesResponse, EmployeesService } from '../services/employees.service';
import { ToasterService } from '../services/toastr.service';
import { TeachersService } from '../services/teachers.service';
import { StudentsService } from '../services/students.service';
import { UsersService } from '../services/users.service';
import { DecimalPipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { EventService } from '../services/event.service';
import { AttendanceService } from '../services/attendance.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isLoading: boolean = false;
  employees: any = [];
  teachers: any = [];
  students:any=[];
  users:any= [];
  events:any=[];
  filteredEvents:any=[];
  formattedStudent:any;
  formattedTeacher:any;
  formattedEmployee:any;
  formattedUser:any;
  labelData:any=[];
  realData:any=[];


  constructor(private employeeService: EmployeesService,
     private teachersService:TeachersService,
     private StudentsService:StudentsService,
    private userService: UsersService,
     private toastr: ToasterService,
     private decimalPipe: DecimalPipe,
     private EventService:EventService,
     private AttendanceService:AttendanceService,
  ){    
  }
    ngOnInit(): void {
    this.getEmployeesList();
    this.getTeachersList();
    this.getStudentsList();
    this.getUsersList();
    this.getEventsList();
    // this.renderChart();
    this.getAttendanceReport();

  }


  
   getEventsList() {
    this.isLoading = true;
    this.EventService.getEvents().subscribe((res: any) => {
      this.events = res.events.data;
      this.filteredEvents = this.events.filter((event:any) => event.status === 'Active').slice(0, 4);
      this.isLoading = false;
      
    },
    (error: any) => {
      console.error('Error fetching events:', error);
      this.toastr.showError('Failed to fetch events. Please try again later.', 'Error');
      this.isLoading = false;
    });
  }
   getEmployeesList() {
    this.isLoading = true;
    this.employeeService.getEmployeesCount().subscribe((res: any) => {
      this.employees = res.employees;
    this.formattedEmployee = this.decimalPipe.transform(this.employees, '2.0-0'); 
     
    }, (error: any) => {
      console.error('Error fetching employees:', error);
      this.toastr.showError('Failed to fetch employees. Please try again later.','Error');
       this.isLoading = false;
      }
  )
  }
    getTeachersList() {
    this.isLoading = true;
    this.teachersService.getTeachersCount().subscribe((res: any) => {
    this.teachers = res.teachers;
    this.formattedTeacher = this.decimalPipe.transform(this.teachers, '2.0-0');      
   
    }, (error: any) => {
      console.error('Error fetching Teachers:', error);
      this.toastr.showError('Failed to fetch Teachers. Please try again later.','Error');
       this.isLoading = false;
     
  });
  }
   getStudentsList(){{
    this.isLoading = true;
    this.StudentsService.getStudentsCount().subscribe((res: any) => {
      this.students = res.students;
      this.formattedStudent = this.decimalPipe.transform(this.students, '2.0-0');    
    },
    (error: any) => {
      console.error('Error fetching classes:', error);
      this.toastr.showError('Failed to fetch Class. Please try again later.','Error');
       this.isLoading = false;
    }
    )
  }}
 
 getUsersList() {
    this.isLoading = true;
    this.userService.getUsersCount().subscribe((res: any) => {
      this.users = res.users;
      this.formattedUser = this.decimalPipe.transform(this.users, '2.0-0');
      // this.isLoading = false;
    }, (error: any) => {
      console.error('Error fetching Users:', error);
      this.toastr.showError('Failed to fetch Users. Please try again later.', 'Error');
      this.isLoading = false;
    });
  }
  
  
  getAttendanceReport(){
      // this.isLoading = true;
    this.AttendanceService.getAttendanceWeekly().subscribe((res: any) => {
      this.labelData = res.days;
      this.realData= res.counts;
      // this.isLoading = false;
      const interval = setInterval(()=>{
        const element = document.getElementById('barchart');
        if (element) {
          this.renderChart();
          clearInterval(interval);
        }
      },500)
    },
    (error: any) => {
      console.error('Error fetching weekly attendance data:', error);
      this.toastr.showError('Error fetching weekly attendance data.', 'Error');
      this.isLoading = false;
    }
  );
  }

     
  renderChart(){
    const mychart= new Chart ('barchart',{
      type:'bar',
      data:{
        labels:this.labelData,
        datasets:[
          {
            data:this.realData,
            backgroundColor:'rgb(0,123,255)',
            hoverBackgroundColor:'#2C54C6' ,
            borderRadius: 5,
            maxBarThickness: 30,
            minBarLength: 2,
          }
        ]

      },
      options:{
         plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
                title: { display: true, text: 'Total Students'}
              }
            },      
        }      
      })
  }


}
