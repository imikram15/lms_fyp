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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersComponent } from './teachers/teachers.component';
import { AddTeachersComponent } from './add-teachers/add-teachers.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../filter.pipe';


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
    FilterPipe
  ],
  imports: [
    CommonModule,
    EmployeesinfoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,   
    NgxPaginationModule
  ],
  exports:[]
})
export class EmployeesinfoModule { }
