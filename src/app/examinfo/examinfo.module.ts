import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminfoRoutingModule } from './examinfo-routing.module';
import { MarksComponent } from './marks/marks.component';
import { ExaminationComponent } from './examination/examination.component';
import { GradesComponent } from './grades/grades.component';
import { PromtionsComponent } from './promtions/promtions.component';
import { ExamComponent } from './exam/exam.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AddGradeComponent } from './add-grade/add-grade.component';
import { ExamCategoryComponent } from './exam-category/exam-category.component';
import { AddExamCategoryComponent } from './add-exam-category/add-exam-category.component';
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
    declarations: [
        MarksComponent,
        ExaminationComponent,
        GradesComponent,
        PromtionsComponent,
        ExamComponent,
        AddExamComponent,
        AddGradeComponent,
        ExamCategoryComponent,
        AddExamCategoryComponent,
    ],
    imports: [
        CommonModule,
        ExaminfoRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class ExaminfoModule { }
