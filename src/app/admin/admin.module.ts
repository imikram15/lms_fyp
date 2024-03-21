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



@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
