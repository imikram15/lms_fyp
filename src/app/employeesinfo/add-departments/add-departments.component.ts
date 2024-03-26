import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DepartmentsService } from '../../services/departments.service';
import { ActivatedRoute, Router } from '@angular/router';
DepartmentsService

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrl: './add-departments.component.scss'
})
export class AddDepartmentsComponent implements OnInit {

  departmentForm!: FormGroup;
  departmentID:any ;
  forUpdate: boolean = false;
  departmentUpdate: any;

  constructor(private formBuilder: FormBuilder, 
     private departmentsService:DepartmentsService,
     private route: ActivatedRoute,
    private router: Router) { }

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
            designation_id: this.departmentUpdate.designation_id,
            title: this.departmentUpdate.title,
          })
        } else {
          console.error('Department data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching Department data:', error);
      });
    }
  }

  errors:any =[];

  onSubmit(): void {
    const formData = this.departmentForm.value;

    if (this.forUpdate) {
      this.departmentsService.updateDepartment(this.departmentID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.departmentForm.reset();
          this.router.navigate(['/departments'])
          // this.toastr.success('designation updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.errors = err.error.errors;
          console.error(err);
        }
      });
    } else {
      this.departmentsService.saveDepartment(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.departmentForm.reset();
          this.router.navigate(['/departments']);
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