import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClassRoutineComponent } from './add-class-routine/add-class-routine.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';
import { SubjectComponent } from './subject/subject.component';
import { AcademicComponent } from './academic/academic.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { AddSyllabusComponent } from './add-syllabus/add-syllabus.component';

const routes: Routes = [

  { path: 'academic', component:AcademicComponent},

  {
    path:'',  
    children:[
      {path:'', redirectTo:'academic', pathMatch:'full'},
      { path: 'class-routine', component:ClassRoutineComponent },
      { path: 'add-class-routine', component:AddClassRoutineComponent },
      { path: 'subject', component:SubjectComponent},
      { path: 'add-subject', component:AddSubjectComponent},      
      { path: 'attendance', component:AttendanceComponent  },
      { path: 'take-attendance', component:TakeAttendanceComponent  },
      { path: 'syllabus', component:SyllabusComponent },
      { path: 'add-syllabus', component:AddSyllabusComponent  },
    ]  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }
