import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ClassesComponent } from './classes/classes.component';
import { StudentsComponent } from './students/students.component';
import { StudentsinfoComponent } from './studentsinfo/studentsinfo.component';
import { AttendanceComponent } from '../Academic/attendance/attendance.component';

const routes: Routes = [ 
  {
    path:'',
    component:StudentsinfoComponent,
    children:[
      {path:'', redirectTo:'studentsinfo', pathMatch:'full'},
      { path: 'students', component:StudentsComponent  },
      { path: 'add-students', component:AddStudentComponent  },
      { path: 'classes', component:ClassesComponent  },
      { path: 'add-class', component:AddClassComponent },
      { path: 'attendance', component:AttendanceComponent  },
    ]  
  },
  {
    path:'studentsinfo', component:StudentsinfoComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsinfoRoutingModule { }
