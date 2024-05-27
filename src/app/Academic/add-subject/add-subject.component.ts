import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectsService } from '../../services/subjects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.scss'
})
export class AddSubjectComponent {
addSubject() {
throw new Error('Method not implemented.');
}

classOptions: any;

subjectForm!: FormGroup;
  forUpdate: boolean = false;
  subjectID: any;
  subjectUpdate: any;
  errors: any = [];
  classes:any;

  constructor(private formBuilder: FormBuilder,
    private subjectService: SubjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService,) { }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      title: ['', Validators.required],
      class_id: ['', Validators.required],
    });
    this.subjectID = this.route.snapshot.paramMap.get('id');
    if (this.subjectID) {
      this.subjectService.getSubject(this.subjectID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.subjectUpdate = res;
          this.subjectForm.patchValue({
            class_id: this.subjectUpdate.class_id,
            title: this.subjectUpdate.title,
          })
        } else {
          this.toastr.showError('Classes data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching Classes data:', error);
      });
    }
    this.getClassesList();
  }

  getClassesList() {
    this.subjectService.getClasses().subscribe((res: any) => {
      this.classes = res.classes.data;
      console.log(res.classes.data);            
    },
    (error: any) => {
      console.error('Error fetching Categories:', error);
      this.toastr.showError('Failed to fetch Categories. Please try again later.','Error');
    }
    )
  }

  onSubmit() {
    const formData = this.subjectForm.value;

    if (this.forUpdate) {
      this.subjectService.updateSubject(this.subjectID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.subjectForm.reset();
          this.router.navigate(['/subject'])
          this.toastr.showSuccess('Class updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.subjectService.saveSubjects(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.subjectForm.reset();
          this.router.navigate(['/subject']);
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
