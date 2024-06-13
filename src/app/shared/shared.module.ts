import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoaderComponent } from './loader/loader.component';
import { PascalCasePipe } from './pascal-case.pipe';


@NgModule({
  declarations: [
    ConfirmComponent,
    LoaderComponent,
    PascalCasePipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule ,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  
  exports:[ConfirmComponent, LoaderComponent, PascalCasePipe]
})
export class SharedModule { }
