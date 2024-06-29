import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component:UserProfileComponent,
    children:[
      {path:'', redirectTo:'userInfo', pathMatch:'full' },
      {path:'add-user', component:AddUserComponent},
      {path:'add-user/:id/edit', component:AddUserComponent},
      {path:'show-user', component:ShowUserComponent},
      {path:'profile', component:ProfileComponent},
    ]
  },
  {
    path:'userInfo',
    component:UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
