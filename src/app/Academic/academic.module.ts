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
import { SubjectComponent } from './subject/subject.component';




@NgModule({
  declarations: [
    AcademicComponent,    
    AddClassRoutineComponent,
    AddSubjectComponent,
    TakeAttendanceComponent,
    AttendanceComponent,
    ClassRoutineComponent,
    SubjectComponent,
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AcademicModule { }
