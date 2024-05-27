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
import { SyllabusComponent } from './syllabus/syllabus.component';
import { AddSyllabusComponent } from './add-syllabus/add-syllabus.component';
import { AddClassRoomComponent } from './add-class-room/add-class-room.component';
import { ClassRoomComponent } from './class-room/class-room.component';
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
        AcademicComponent,
        AddClassRoutineComponent,
        TakeAttendanceComponent,
        AttendanceComponent,
        ClassRoutineComponent,
        SubjectComponent,
        AddSubjectComponent,
        SyllabusComponent,
        AddSyllabusComponent,
        SubjectComponent,
        SyllabusComponent,
        AddSyllabusComponent,
        AddClassRoomComponent,
        ClassRoomComponent,
    ],
    imports: [
        CommonModule,
        AcademicRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NgxPaginationModule
    ]
})
export class AcademicModule { }
