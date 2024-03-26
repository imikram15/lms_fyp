import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesignationsService } from '../../services/designations.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router) { }

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
          // this.toastr.success('designation updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.errors = err.error.errors;
          console.error(err);
        }
      });
    } else {
      this.designationsService.saveDesignation(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.designationForm.reset();
          this.router.navigate(['/designations']);
       // this.toastr.success('Employee added successfully!', 'Success');

        },
        error: (err: any) => {
          this.errors = err.error.errors;
          console.log(err);
        }
      });
    }
  }

}
