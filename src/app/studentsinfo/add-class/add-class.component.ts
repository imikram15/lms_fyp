import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassesService } from '../../services/classes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.scss'
})
export class AddClassComponent {

  classForm!: FormGroup;
  forUpdate: boolean = false;
  classID: any;
  classUpdate: any;
  errors: any = [];

  constructor(private formBuilder: FormBuilder,
    private classesService: ClassesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService,) { }

  ngOnInit(): void {
    this.classForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
    this.classID = this.route.snapshot.paramMap.get('id');
    if (this.classID) {
      this.classesService.getClass(this.classID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.classUpdate = res;
          this.classForm.patchValue({
            class_id: this.classUpdate.class_id,
            title: this.classUpdate.title,
          })
        } else {
          console.error('Classes data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching Classes data:', error);
      });
    }
  }

  onSubmit() {
    const formData = this.classForm.value;

    if (this.forUpdate) {
      this.classesService.updateClass(this.classID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.classForm.reset();
          this.router.navigate(['/classes'])
          this.toastr.showSuccess('Class updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.classesService.saveClasses(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.classForm.reset();
          this.router.navigate(['/classes']);
          this.toastr.showSuccess('Class added successfully!', 'Success');

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
