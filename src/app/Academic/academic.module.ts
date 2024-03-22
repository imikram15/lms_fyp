import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicRoutingModule } from './academic-routing.module';
import { AcademicComponent } from './academic/academic.component';
import { AddClassRoutineComponent } from './add-class-routine/add-class-routine.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { SubjectComponent } from './subject/subject.component';

=======
import { SyllabusComponent } from './syllabus/syllabus.component';
import { AddSyllabusComponent } from './add-syllabus/add-syllabus.component';
>>>>>>> ed2984e044c51ffb1b21859ccd363694bc6c0608



@NgModule({
  declarations: [
    AcademicComponent,    
    AddClassRoutineComponent,
    TakeAttendanceComponent,
    AttendanceComponent,
    ClassRoutineComponent,
<<<<<<< HEAD
    SubjectComponent,
=======
    SyllabusComponent,
    AddSyllabusComponent,
>>>>>>> ed2984e044c51ffb1b21859ccd363694bc6c0608
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AcademicModule { }
