import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentFeeService } from '../../services/student-fee.service';
import { ToasterService } from '../../services/toastr.service';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-student-fee-manager',
  templateUrl: './student-fee-manager.component.html',
  styleUrl: './student-fee-manager.component.scss'
})
export class StudentFeeManagerComponent {
  isLoading: boolean = false;
  studentFees: any[] = [];
  searchForm!: FormGroup;
  classes: any;
  status: any;
  defaultClassId: number = 0;
  defaultStatus: string = 'allstatus';
  baseURL = environment.apiUrl;
  page: number = 1;
  total: any;
  perPage: any;
  member_type:any;
  member_id:any;


  constructor(
    private fb: FormBuilder,
    private studentFeeService: StudentFeeService,
    private toastr: ToasterService,
    public dialog: MatDialog,
    public commonService: CommonService
  ) {
     this.member_type = localStorage.getItem('member_type');
    this.member_id = localStorage.getItem('member_id');
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      class_id: [this.defaultClassId,],
      status: [this.defaultStatus, Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });

    this.getClassesList();
  }

  getClassesList() {
    this.studentFeeService.getClasses().subscribe(
      (res: any) => {
        this.classes = res.classes.data;
      },
      (error: any) => {
        console.error('Error fetching classes:', error);
        this.toastr.showError('Failed to fetch classes. Please try again later.', 'Error');
      }
    );
  }

   setClassIdValidator() {
    const classIdControl = this.searchForm.get('class_id');
    if (classIdControl) {
      if (this.member_type !== 'students') {
        classIdControl.setValidators([Validators.required]);
      } else {
        classIdControl.clearValidators();
      }
      classIdControl.updateValueAndValidity();
    }
  }


  searchStudentFees() {
    const searchData = {
      ...this.searchForm.value,
       member_type:this.member_type,
     member_id:this.member_id,
      page: this.page
    };

    this.isLoading = true;
    if (this.searchForm.invalid) {
      this.toastr.showError('Please fill in all required fields.', 'Error');
      this.isLoading = false;
      return;
    }
    
    if (this.member_type == 'students') {      
     this.studentFeeService.getStudentFees(searchData)
      .subscribe(
        (response) => {
          this.studentFees = response.student_fees.data;
          this.isLoading = false;
          this.page = response.student_fees.current_page;
          this.total = response.student_fees.total;
          this.perPage = response.student_fees.per_page;
        },
        (error) => {
          console.error('Error fetching student fees:', error);
          this.toastr.showError('Failed to fetch student fees. Please try again later.', 'Error');
          this.isLoading = false;

        }
      );
    }else{
      this.studentFeeService.getStudentFeesByClass(searchData).subscribe(
        (data: any) => {
          this.studentFees = data.studentFee.data;
          this.page = data.studentFee.current_page;
          this.total = data.studentFee.total;
          this.perPage = data.studentFee.per_page;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching student fees:', error);
          this.toastr.showError('Failed to fetch student fees. Please try again later.', 'Error');
          this.isLoading = false;
        }
      );
    }


  }

  
  onTableDataChange(event: any) {
    this.page = event;
  }
  
  confirmDialog(id: string | number): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: { data: dialogData, id: id, loc: 'fee' },
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.searchStudentFees();
      }
    });
  }
}
