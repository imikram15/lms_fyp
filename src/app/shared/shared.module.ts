import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    MatDialogModule,
    MatButtonModule ,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  
  exports:[ConfirmComponent, LoaderComponent]
})
export class SharedModule { }
