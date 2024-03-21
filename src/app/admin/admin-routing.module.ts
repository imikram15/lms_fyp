import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

import { AdminComponent } from './admin/admin.component';
import { StudentsinfoComponent } from '../studentsinfo/studentsinfo/studentsinfo.component';
import { EmployeesinfoComponent } from '../employeesinfo/employeesinfo/employeesinfo.component';


const routes: Routes = [
  {
    path:'admin', component:AdminComponent
  },
  {
    path:'',  
    children:[
      {path:'', redirectTo:'admin', pathMatch:'full'},
      { path: 'dashboard', component:DashboardComponent  },
      { path: 'pagenotfound', component:PageNotFoundComponent  },
    ]  
  },
  {
    path: '',
    component:StudentsinfoComponent,
    children: [
        {
      path: '',
  loadChildren: () => import('../studentsinfo/studentsinfo.module').then(x => x.StudentsinfoModule)
  }]},

  {
    path: '',
    component:EmployeesinfoComponent,
    children: [
        {
      path: '',
  loadChildren: () => import('../employeesinfo/employeesinfo.module').then(x => x.EmployeesinfoModule)
  }]},



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
