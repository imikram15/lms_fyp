import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesinfoComponent } from './employeesinfo/employeesinfo.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { AddDepartmentsComponent } from './add-departments/add-departments.component';
import { AddDesignationsComponent } from './add-designations/add-designations.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { CategoriesComponent } from './categories/categories.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { EmployeeComponent } from './employee/employee.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AddTeachersComponent } from './add-teachers/add-teachers.component';

const routes: Routes = [
  {
    path:'employeesinfo', component:EmployeesinfoComponent
  },
  {
    path:'', component:EmployeesinfoComponent, 
    children:[
      {path:'', redirectTo:'employeesinfo', pathMatch:'full'},
      { path: 'employees', component:EmployeeComponent  },
      { path: 'add-employees', component:AddEmployeeComponent  },
      { path: 'add-employees/:id/edit', component:AddEmployeeComponent  },
      { path: 'categories', component:CategoriesComponent },
      { path: 'add-categories', component:AddCategoriesComponent },
      { path: 'designations', component:DesignationsComponent  },
      { path: 'add-designations', component:AddDesignationsComponent },
      { path: 'departments', component:DepartmentsComponent  },
      { path: 'add-departments', component:AddDepartmentsComponent  },
      {path: 'teachers', component:TeachersComponent},      
      {path: 'add-teachers', component:AddTeachersComponent}      
    ] 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesinfoRoutingModule { }
