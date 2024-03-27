import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesinfoRoutingModule } from './employeesinfo-routing.module';
import { EmployeesinfoComponent } from './employeesinfo/employeesinfo.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { AddDepartmentsComponent } from './add-departments/add-departments.component';
import { AddDesignationsComponent } from './add-designations/add-designations.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { CategoriesComponent } from './categories/categories.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { EmployeeComponent } from './employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeachersComponent } from './teachers/teachers.component';
import { AddTeachersComponent } from './add-teachers/add-teachers.component';
import { LoaderComponent } from '../layouts/loader/loader.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EmployeesinfoComponent,
    EmployeeComponent,
    AddCategoriesComponent,
    AddDepartmentsComponent,
    AddDesignationsComponent,
    AddEmployeeComponent,
    CategoriesComponent,
    DepartmentsComponent, 
    DesignationsComponent,
    TeachersComponent,
    AddTeachersComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    EmployeesinfoRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EmployeesinfoModule { }
