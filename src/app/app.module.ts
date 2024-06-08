import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
>>>>>>> 6b27861e3b99117a18bf8d6eb7c2a924249ebab3
=======

>>>>>>> 19c71981f36a75967a0c307fb4db3302d6294c86


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot(),
<<<<<<< HEAD
<<<<<<< HEAD
   
=======

>>>>>>> 6b27861e3b99117a18bf8d6eb7c2a924249ebab3
=======

>>>>>>> 19c71981f36a75967a0c307fb4db3302d6294c86
  ],
  exports:[],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
