import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminfoRoutingModule } from './examinfo-routing.module';
import { MarksComponent } from './marks/marks.component';
import { ExaminationComponent } from './examination/examination.component';
import { GradesComponent } from './grades/grades.component';
import { PromtionsComponent } from './promtions/promtions.component';
import { ExamComponent } from './exam/exam.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGradeComponent } from './add-grade/add-grade.component';



@NgModule({
  declarations: [
    MarksComponent,
    ExaminationComponent,
    GradesComponent,
    PromtionsComponent,
    ExamComponent,
    AddExamComponent,
    AddGradeComponent,
  ],
  imports: [
    CommonModule,
    ExaminfoRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class ExaminfoModule { }
