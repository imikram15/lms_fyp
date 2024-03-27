import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DepartmentsService } from '../../services/departments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';
DepartmentsService

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrl: './add-departments.component.scss'
})
export class AddDepartmentsComponent implements OnInit {

  departmentForm!: FormGroup;
  departmentID: any;
  forUpdate: boolean = false;
  departmentUpdate: any;

  constructor(private formBuilder: FormBuilder,
    private departmentsService: DepartmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService,) { }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
    this.departmentID = this.route.snapshot.paramMap.get('id');
    if (this.departmentID) {
      this.departmentsService.getDepartment(this.departmentID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.departmentUpdate = res;
          this.departmentForm.patchValue({
            department_id: this.departmentUpdate.department_id,
            title: this.departmentUpdate.title,
          })
        } else {
        this.toastr.showError('Department data not found or invalid format', 'Error');
        }
      }, error => {
        this.toastr.showError('Error fetching Department data', error );
      });
    }
  }

  errors: any = [];

  onSubmit(): void {
    const formData = this.departmentForm.value;

    if (this.forUpdate) {
      this.departmentsService.updateDepartment(this.departmentID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.departmentForm.reset();
          this.router.navigate(['/departments'])
          this.toastr.showSuccess('Department updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.departmentsService.saveDepartment(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.departmentForm.reset();
          this.router.navigate(['/departments']);
          this.toastr.showSuccess('Department added successfully!', 'Success');

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