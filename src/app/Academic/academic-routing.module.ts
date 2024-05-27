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
import { ClassRoomComponent } from './class-room/class-room.component';
import { AddClassRoomComponent } from './add-class-room/add-class-room.component';

const routes: Routes = [

  { path: 'academic', component:AcademicComponent},

  {
    path:'',  
    children:[
      {path:'', redirectTo:'academic', pathMatch:'full'},
      { path: 'class-routine', component:ClassRoutineComponent },
      { path: 'add-class-routine', component:AddClassRoutineComponent },
      { path: 'add-class-routine/:id/edit', component:AddClassRoutineComponent },
      { path: 'subject', component:SubjectComponent},
      { path: 'add-subject', component:AddSubjectComponent},      
      { path: 'add-subject/:id/edit', component:AddSubjectComponent},      
      { path: 'attendance', component:AttendanceComponent  },
      { path: 'take-attendance', component:TakeAttendanceComponent  },
      { path: 'syllabus', component:SyllabusComponent },
      { path: 'add-syllabus', component:AddSyllabusComponent  },
      { path: 'add-syllabus/:id/edit', component:AddSyllabusComponent  },
      { path: 'class-room', component:ClassRoomComponent },
      { path: 'add-class-room', component:AddClassRoomComponent  },
      { path: 'add-class-room/:id/edit', component:AddClassRoomComponent  },
    ]  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }
