import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    MatDialogModule,
    MatButtonModule  
  ],
  
  exports:[ConfirmComponent]
})
export class SharedModule { }
