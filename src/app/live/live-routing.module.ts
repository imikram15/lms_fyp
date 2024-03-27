import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivesettingComponent } from './livesetting/livesetting.component';
import { LiveclassComponent } from './liveclass/liveclass.component';

const routes: Routes = [
  { path: 'livesetting', component:LivesettingComponent},
  {
    path:'',
    children:[
      {path:'', redirectTo:'livesetting',pathMatch:'full'},
      { path: 'live-class', component:LiveclassComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveRoutingModule { }
