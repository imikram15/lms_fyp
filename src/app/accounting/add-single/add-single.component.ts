import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentFeeService } from '../../services/student-fee.service';
import { ToasterService } from '../../services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-single',
  templateUrl: './add-single.component.html',
  styleUrl: './add-single.component.scss'
})
export class AddSingleComponent {
  feeForm!: FormGroup;
  forUpdate: boolean = false;
  feeID: any;
  feeUpdate: any;
  errors: any = [];
  isLoading: boolean = false;
  classes: any[] = [];
  students: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private feeService: StudentFeeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    this.feeForm = this.formBuilder.group({
      class_id: ['', Validators.required],
      student_id: ['', Validators.required],
      invoiceTitle: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paidAmount: ['', Validators.required],
      status: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });

    this.feeID = this.route.snapshot.paramMap.get('id');
    if (this.feeID) {
      this.feeService.getStudentFee(this.feeID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.feeUpdate = res;
          this.feeForm.patchValue({
            class_id: this.feeUpdate.class.class_id,
            student_id: this.feeUpdate.student.student_id,
            totalAmount: this.feeUpdate.totalAmount,
            paidAmount: this.feeUpdate.paidAmount,
            status: this.feeUpdate.status,
            paymentMethod: this.feeUpdate.paymentMethod,
          });
        } else {
          this.toastr.showError('Fee data not found or invalid format:', res);
        }
      }, (error: any) => {
        console.error('Error fetching Fee data:', error);
      });
    }

    this.getClassesList();
    this.getStudentsList();
  }

  getClassesList() {
    this.feeService.getClasses().subscribe((res: any) => {
      this.classes = res.classes.data;      
    }, (error: any) => {
      console.error('Error fetching Classes:', error);
      this.toastr.showError('Failed to fetch Classes. Please try again later.', 'Error');
    });
  }

  getStudentsList() {
    this.feeService.getStudents().subscribe((res: any) => {
      this.students = res.students.data;      
    }, (error: any) => {
      console.error('Error fetching Students:', error);
      this.toastr.showError('Failed to fetch Students. Please try again later.', 'Error');
    });
  }

  onSubmit() {
    const formData = this.feeForm.value;

    if (this.forUpdate) {
      this.feeService.updateStudentFee(this.feeID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.feeForm.reset();
          this.router.navigate(['/student-fee-manager']);
          this.toastr.showSuccess('Fee updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.feeService.createStudentFee(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.feeForm.reset();
          this.router.navigate(['/student-fee-manager']);
          this.toastr.showSuccess('Fee added successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.log(err);
        }
      });
    }
  }

  private handle422Error(err: any): void {
    if (err.status === 422 && err.error && err.error.errors) {
      const errorMessages = Object.values(err.error.errors).flat();
      errorMessages.forEach((message: any) => {
        this.toastr.showError(message, 'Error');
      });
    } else {
      this.toastr.showError('An unexpected error occurred. Please try again later.', 'Error');
    }
  }
  
}
