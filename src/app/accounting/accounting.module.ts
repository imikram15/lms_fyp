import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountinginfoComponent } from './accountinginfo/accountinginfo.component';
import { StudentFeeManagerComponent } from './student-fee-manager/student-fee-manager.component';
import { AddMassComponent } from './add-mass/add-mass.component';
import { AddSingleComponent } from './add-single/add-single.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        AccountinginfoComponent,
        StudentFeeManagerComponent,
        AddMassComponent,
        AddSingleComponent
    ],
    imports: [
        CommonModule,
        AccountingRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule
    ]
})
export class AccountingModule { }
