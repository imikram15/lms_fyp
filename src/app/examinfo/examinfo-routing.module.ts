import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationComponent } from './examination/examination.component';
import { GradesComponent } from './grades/grades.component';
import { MarksComponent } from './marks/marks.component';
import { PromtionsComponent } from './promtions/promtions.component';
import { ExamComponent } from './exam/exam.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { AddGradeComponent } from './add-grade/add-grade.component';

const routes: Routes = [
  { path: 'exam', component:ExamComponent},
  {
    path:'',
    children:[
      {path:'', redirectTo:'exam',pathMatch:'full'},
      { path: 'examination', component:ExaminationComponent },
      { path: 'grades', component:GradesComponent },
      { path: 'marks', component:MarksComponent },
      { path: 'promotion', component:PromtionsComponent },
      { path: 'add-exam', component:AddExamComponent },
      { path: 'add-grade', component:AddGradeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminfoRoutingModule { }
