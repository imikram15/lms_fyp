import { Component } from '@angular/core';
import { ClassRoomService } from '../../services/class-room.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-add-class-room',
  templateUrl: './add-class-room.component.html',
  styleUrl: './add-class-room.component.scss'
})
export class AddClassRoomComponent {

classrooms!: FormGroup;
newClassroom: any = { title: ''};
forUpdate: boolean = false;
classID: any;
classUpdate: any;
errors: any = [];

constructor(private classroomService: ClassRoomService,
  private formBuilder:FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private toastr: ToasterService
) { }

ngOnInit(): void {
  this.classrooms = this.formBuilder.group({
    title: ['', Validators.required],
  });
  this.classID = this.route.snapshot.paramMap.get('id');
  if (this.classID) {
    this.classroomService.getClassroom(this.classID).subscribe((res: any) => {
      if (res && res.id) {
        this.forUpdate = true;
        this.classUpdate = res;
        this.classrooms.patchValue({
          class_id: this.classUpdate.class_id,
          title: this.classUpdate.title,
        })
      } else {
        this.toastr.showError('Classes data not found or invalid format:', res);
      }
    }, error => {
      this.toastr.showError('Error fetching Classes data:', error);
    });
  }
}


onSubmit() {
  const formData = this.classrooms.value;

  if (this.forUpdate) {
    this.classroomService.updateClassroom(this.classID, formData).subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        this.classrooms.reset();
        this.router.navigate(['/class-room'])
        this.toastr.showSuccess('Class Room updated successfully!', 'Success');
      },
      error: (err: any) => {
        this.handle422Error(err);
        console.error(err);
      }
    });
  } else {
    this.classroomService.createClassroom(formData).subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        this.classrooms.reset();
        this.router.navigate(['/class-room']);
        this.toastr.showSuccess('Class Room added successfully!', 'Success');

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
