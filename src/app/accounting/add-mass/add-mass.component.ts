import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentFeeService } from '../../services/student-fee.service';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-add-mass',
  templateUrl: './add-mass.component.html',
  styleUrl: './add-mass.component.scss'
})
export class AddMassComponent {
  feeForm!: FormGroup
  classes: any[] = [];
  students: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private feeService: StudentFeeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService
  ) {}

  ngOnInit(): void {
    this.feeForm = this.formBuilder.group({
      class_id: ['', Validators.required],
      invoiceTitle: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paidAmount: ['', Validators.required],
      status: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });

    this.getClassesList();
  }

  getClassesList() {
    this.feeService.getClasses().subscribe((res: any) => {
      this.classes = res.classes.data;
    }, (error: any) => {
      console.error('Error fetching Classes:', error);
      this.toastr.showError('Failed to fetch Classes. Please try again later.', 'Error');
    });
  }

  onSubmit() {
    const formData = this.feeForm.value;

      this.feeService.createBulkStudentFees(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.feeForm.reset();
          this.router.navigate(['/student-fee-manager']);
          this.toastr.showSuccess('Fees added successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.log(err);
        }
      });
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
