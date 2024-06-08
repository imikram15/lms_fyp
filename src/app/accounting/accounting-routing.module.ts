import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountinginfoComponent } from './accountinginfo/accountinginfo.component';
import { StudentFeeManagerComponent } from './student-fee-manager/student-fee-manager.component';
import { AddMassComponent } from './add-mass/add-mass.component';
import { AddSingleComponent } from './add-single/add-single.component';

const routes: Routes = [
  { path: 'accounting-info', component:AccountinginfoComponent},
  {
    path:'',
    children:[
      {path:'', redirectTo:'livesetting',pathMatch:'full'},
      { path: 'student-fee-manager', component:StudentFeeManagerComponent },
      { path: 'add-mass', component:AddMassComponent },
      { path: 'add-single', component:AddSingleComponent},
      { path: 'add-single/:id/edit', component:AddSingleComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
