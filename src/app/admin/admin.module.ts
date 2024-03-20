import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from '../employeesinfo/add-employee/add-employee.component';
import { CategoriesComponent } from '../employeesinfo/categories/categories.component';
import { DepartmentsComponent } from '../employeesinfo/departments/departments.component';
import { DesignationsComponent } from '../employeesinfo/designations/designations.component';
import { AddCategoriesComponent } from '../employeesinfo/add-categories/add-categories.component';
import { AddDepartmentsComponent } from '../employeesinfo/add-departments/add-departments.component';
import { AddDesignationsComponent } from '../employeesinfo/add-designations/add-designations.component';
import { StudentsComponent } from '../studentsinfo/students/students.component';
import { AddStudentComponent } from '../studentsinfo/add-student/add-student.component';
import { ClassesComponent } from '../studentsinfo/classes/classes.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    AddEmployeeComponent,    
    DepartmentsComponent,
    DesignationsComponent,
    CategoriesComponent,
    AddCategoriesComponent,
    AddDepartmentsComponent,
    AddDesignationsComponent,
    StudentsComponent,
    AddStudentComponent,
    ClassesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
