import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toastr.service';
import { ClassRoutinesService } from '../../services/class-routines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SubjectsService } from '../../services/subjects.service';
import { ClassRoomService } from '../../services/class-room.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-add-class-routine',
  templateUrl: './add-class-routine.component.html',
  styleUrl: './add-class-routine.component.scss'
})
export class AddClassRoutineComponent {

  forUpdate: boolean = false;
  routineID: any;
  routineUpdate: any;
  classroutineForm: FormGroup; 
  isLoading: boolean = false;
  classes: any[] = [];
  subjects: any[] = [];
  classrooms: any[] = [];
  teachers: any[] = [];
  routines: any[] = [];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  startingminuteOptions: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  startinghoursOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? 'AM' : 'PM';
    return { display: `${hour} ${period}`, value: i };
  });

  endingminuteOptions: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  endinghoursOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? 'AM' : 'PM';
    return { display: `${hour} ${period}`, value: i };
  });


constructor(
  private fb: FormBuilder,
  private toastr: ToasterService,
  private classRoutineService: ClassRoutinesService,
  private router: Router,
  private route: ActivatedRoute,
) {
  this.classroutineForm = this.fb.group({
    class_id: ['', Validators.required],
      day: ['', Validators.required],
      startinghours: ['', Validators.required],
      startingminute: ['', Validators.required],
      endinghours: ['', Validators.required],
      endingminute: ['', Validators.required],
      classroom_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
      subject_id: ['', Validators.required]
  });
  this.routineID = this.route.snapshot.paramMap.get('id');
    if (this.routineID) {
      this.isLoading = true;
      this.classRoutineService.getRoutine(this.routineID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.routineUpdate = res;
          this.classroutineForm.patchValue({
            class_id: this.routineUpdate.class_id,
            day: this.routineUpdate.day,
            startinghours: this.routineUpdate.startinghours,
            startingminute: this.routineUpdate.startingminute,
            endinghours: this.routineUpdate.endinghours,
            endingminute: this.routineUpdate.endingminute,
            classroom_id: this.routineUpdate.classroom_id,
            teacher_id: this.routineUpdate.teacher_id,
            subject_id: this.routineUpdate.subject_id
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.toastr.showError('Routine data not found or invalid format:', res);
        }
      }, error => {
        this.isLoading = false;
        console.error('Error fetching Routine data:', error);
      });
    }
  }

ngOnInit(): void {
  this.loadClasses();
  this.loadClassrooms();
  this.loadSubjects();
  this.loadTeachers();
}

loadClasses() {
  this.classRoutineService.getClasses().pipe(
    catchError(err => {
      console.error('Error fetching classes:', err);
      this.toastr.showError('Failed to load classes. Please try again later.', 'Error');
      return throwError(err);
    })
  ).subscribe((data: any) => {
    this.classes = data.classes.data;
  });
}

loadClassrooms() {
  this.classRoutineService.getClassrooms().pipe(
    catchError(err => {
      console.error('Error fetching classrooms:', err);
      this.toastr.showError('Failed to load classrooms. Please try again later.', 'Error');
      return throwError(err);
    })
  ).subscribe((data: any) => {
    this.classrooms = data.classrooms.data;
  });
}

loadSubjects() {
  this.classRoutineService.getSubjects().pipe(
    catchError(err => {
      console.error('Error fetching subjects:', err);
      this.toastr.showError('Failed to load subjects. Please try again later.', 'Error');
      return throwError(err);
    })
  ).subscribe((data: any) => {
    this.subjects = data.subjects.data;
  });
}

loadTeachers() {
  this.classRoutineService.getTeachers().pipe(
    catchError(err => {
      console.error('Error fetching teachers:', err);
      this.toastr.showError('Failed to load teachers. Please try again later.', 'Error');
      return throwError(err);
    })
  ).subscribe((data: any) => {
    this.teachers = data.teachers.data;
  });
}

createRoutine() {
  const formData = this.classroutineForm.value;
  if (this.classroutineForm.invalid) {
    this.toastr.showError('Please fill all the required fields.', 'Error');
    this.isLoading = false;
    return;
  }

  if (this.forUpdate) {
    this.classRoutineService.updateRoutine(this.routineID, formData).subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        this.classroutineForm.reset();
        this.router.navigate(['/class-routine']);
        this.toastr.showSuccess('Class routine updated successfully!', 'Success');
      },
      error: (err: any) => {
        this.handle422Error(err);
        console.error(err);
      }
    });
  } else {
    this.classRoutineService.createRoutine(formData).subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        this.classroutineForm.reset();
        this.router.navigate(['/class-routine']);
        this.toastr.showSuccess('Class routine added successfully!', 'Success');
      },
      error: (err: any) => {
        this.handle422Error(err);
        console.error(err);
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
