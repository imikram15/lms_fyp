import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsinfoRoutingModule } from './studentsinfo-routing.module';
import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentsinfoComponent } from './studentsinfo/studentsinfo.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ClassesComponent } from './classes/classes.component';
import { AddClassComponent } from './add-class/add-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceComponent } from '../Academic/attendance/attendance.component';




@NgModule({
  declarations: [
    StudentsinfoComponent,
    StudentsComponent,
    AddStudentComponent,
    ClassesComponent,
    AddClassComponent,
    AttendanceComponent,
  ],
  imports: [
    CommonModule,
    StudentsinfoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class StudentsinfoModule { }
