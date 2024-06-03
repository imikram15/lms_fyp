import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'',    redirectTo:'login',    pathMatch:'full'  },
  { path:'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent  },
  { path: 'forgotpassword', component:ForgotPasswordComponent  },
  {
    path: '',
    component: AdminComponent, 
    canActivate:[AuthGuard],
    children: [
        {
      path: '',
      loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  }]},

  { path:'**',   redirectTo:'login'  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
