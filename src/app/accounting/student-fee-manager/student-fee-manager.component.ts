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


  constructor(
    private fb: FormBuilder,
    private studentFeeService: StudentFeeService,
    private toastr: ToasterService,
    public dialog: MatDialog,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      class_id: [this.defaultClassId, Validators.required],
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


  searchStudentFees() {
    const searchData = this.searchForm.value;

    this.isLoading = true;
    if (this.searchForm.invalid) {
      this.toastr.showError('Please fill in all required fields.', 'Error');
      this.isLoading = false;
      return;
    }

    this.studentFeeService.getStudentFeesByClass(searchData).subscribe(
      (data: any) => {
        this.studentFees = data.studentFee.data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching student fees:', error);
        this.toastr.showError('Failed to fetch student fees. Please try again later.', 'Error');
        this.isLoading = false;
      }
    );
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
