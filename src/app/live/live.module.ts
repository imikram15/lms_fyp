import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { LivesettingComponent } from './livesetting/livesetting.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LiveclassComponent,
    LivesettingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LiveRoutingModule
  ]
})
export class LiveModule { }
