import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from "../shared/shared.module";
import { PascalCasePipe } from '../pascal-case.pipe';


@NgModule({
    declarations: [
        UserProfileComponent,
        AddUserComponent,
        ShowUserComponent,
        PascalCasePipe
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule
    ]
})
export class UsersModule { }
