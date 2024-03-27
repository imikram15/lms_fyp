import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesignationsService } from '../../services/designations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-add-designations',
  templateUrl: './add-designations.component.html',
  styleUrl: './add-designations.component.scss'
})
export class AddDesignationsComponent implements OnInit {

  designationForm!: FormGroup;
  forUpdate: boolean = false;
  designationID!: any;
  designationUpdate: any;

  constructor(private formBuilder: FormBuilder,
    private designationsService: DesignationsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr:ToasterService,) { }

  ngOnInit(): void {
    this.designationForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
    this.designationID = this.route.snapshot.paramMap.get('id');
    if (this.designationID) {
      this.designationsService.getDesignation(this.designationID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.designationUpdate = res;
          this.designationForm.patchValue({
            designation_id: this.designationUpdate.designation_id,
            title: this.designationUpdate.title,
          })
        } else {
          console.error('Designation data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching Designation data:', error);
      });
    }
  }
  errors: any = [];

  onSubmit(): void {

    const formData = this.designationForm.value;

    if (this.forUpdate) {
      this.designationsService.updateDesignation(this.designationID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.designationForm.reset();
          this.router.navigate(['/designations'])
          this.toastr.showSuccess('designation updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.designationsService.saveDesignation(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.designationForm.reset();
          this.router.navigate(['/designations']);
       this.toastr.showSuccess('Designation added successfully!', 'Success');

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
