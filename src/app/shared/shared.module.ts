import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';



@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConfirmationComponent
  ]
})
export class SharedModule { }
