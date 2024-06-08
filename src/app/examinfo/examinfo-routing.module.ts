import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationComponent } from './examination/examination.component';
import { GradesComponent } from './grades/grades.component';
import { MarksComponent } from './marks/marks.component';
import { PromtionsComponent } from './promtions/promtions.component';
import { ExamComponent } from './exam/exam.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { AddGradeComponent } from './add-grade/add-grade.component';
import { ExamCategoryComponent } from './exam-category/exam-category.component';
import { AddExamCategoryComponent } from './add-exam-category/add-exam-category.component';

const routes: Routes = [
  { path: 'exam', component:ExamComponent},
  {
    path:'',
    children:[
      {path:'', redirectTo:'exam',pathMatch:'full'},
      { path: 'examination', component:ExaminationComponent },
      { path: 'exam-category', component:ExamCategoryComponent },
      { path: 'add-exam-category', component:AddExamCategoryComponent },
      { path: 'add-exam-category/:id/edit', component:AddExamCategoryComponent },
      { path: 'grades', component:GradesComponent },
      { path: 'marks', component:MarksComponent },
      { path: 'promotion', component:PromtionsComponent },
      { path: 'add-exam', component:AddExamComponent },
      { path: 'add-exam/:id/edit', component:AddExamComponent },
      { path: 'add-grade', component:AddGradeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminfoRoutingModule { }
