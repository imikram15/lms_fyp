import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {
  title: string;
  message: string;
  id!:number|string;
 
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private employeeService:EmployeesService,
    ) {
   
    this.title = data.data.title ;
    this.message = data.data.message;
  } 

  ngOnInit() {
  }

  onConfirm(): void {
     this.employeeService.destroyEmployee(this.data.id).subscribe((res: any) => { 
       this.dialogRef.close(true);               
        })
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }

}
