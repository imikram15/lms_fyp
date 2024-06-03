import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyllabusService } from '../../services/syllabus.service';
import { catchError, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrl: './add-syllabus.component.scss'
})
export class AddSyllabusComponent {

  syllabusForm: FormGroup;
  forUpdate: boolean = false;
  syllabusID: any;
  syllabusUpdate: any;
  isLoading: boolean = false;
  classes: any[] = [];
  subjects: any[] = [];
  fileUrl = environment.mediaUrl2;
  selectedFile: File | null = null; // Store selected file


  constructor(
    private fb: FormBuilder,
    private toastr: ToasterService,
    private syllabusService: SyllabusService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.syllabusForm = this.fb.group({
      class_id: ['', Validators.required],
      subject_id: ['', Validators.required],
      title: ['', Validators.required],
      syllabus_file: [null]
    });

    this.syllabusID = this.route.snapshot.paramMap.get('id');
    if (this.syllabusID) {
      this.isLoading = true;
      this.syllabusService.getSyllabus(this.syllabusID).subscribe(
        (res: any) => {
          console.log('Syllabus Response:', res);
          if (res && res.syllabus.id) {
            this.forUpdate = true;
            this.syllabusUpdate = res.syllabus;
            console.log(this.syllabusUpdate);
            this.syllabusForm.patchValue({
              class_id: this.syllabusUpdate.class_id || '',
              subject_id: this.syllabusUpdate.subject_id || '',
              title: this.syllabusUpdate.title || '',
              syllabus_file: this.fileUrl + this.syllabusUpdate.syllabus_file || '',
            });
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.toastr.showError('Syllabus not found or invalid format:', res);
          }
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error fetching Syllabus:', error);
        }
      );
    }else {
      console.log('No syllabusID found in route');  // Log when the ID is not found
    }
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadSubjects();
  }

  loadClasses() {
    this.syllabusService.getClasses().pipe(
      catchError(err => {
        console.error('Error fetching classes:', err);
        this.toastr.showError('Failed to load classes. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.classes = data.classes.data;
    });
  }

  loadSubjects() {
    this.syllabusService.getSubjects().pipe(
      catchError(err => {
        console.error('Error fetching subjects:', err);
        this.toastr.showError('Failed to load subjects. Please try again later.', 'Error');
        return throwError(err);
      })
    ).subscribe((data: any) => {
      this.subjects = data.subjects.data;
    });
  }

  SubmitSyllabus() {
    if (this.syllabusForm.invalid) {
      this.toastr.showError('Please fill all the required fields.', 'Error');
      this.isLoading = false;
      return;
    }
    const formData = new FormData();
    formData.append('title', this.syllabusForm.value.title);
    formData.append('class_id', this.syllabusForm.value.class_id);
    formData.append('subject_id', this.syllabusForm.value.subject_id);
    if (this.selectedFile) {
      formData.append('syllabus_file', this.selectedFile); 
    }

    if (this.forUpdate) {
      this.syllabusService.updateSyllabus(this.syllabusID!, formData).subscribe({
        next: (res: any) => {
          console.log('Syllabus updated successfully:', res);
          this.syllabusForm.reset();
          this.router.navigate(['/syllabus']);
          this.toastr.showSuccess('Syllabus updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.toastr.showError('Failed to update syllabus:', err);
          console.error('Failed to update syllabus:', err);
        }
      });
    } else {
      this.syllabusService.createSyllabus(formData).subscribe({
        next: (res: any) => {
          console.log('Syllabus created successfully:', res);
          this.syllabusForm.reset();
          this.router.navigate(['/syllabus']);
          this.toastr.showSuccess('Syllabus created successfully!', 'Success');
        },
        error: (err: any) => {
          this.toastr.showError('Failed to create syllabus:', err);
          console.error('Failed to create syllabus:', err);
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the file in the component
      this.syllabusForm.patchValue({ syllabus_file: file.name }); // Just to show file name in the form
      this.syllabusForm.get('syllabus_file')?.setValidators([Validators.required]);
      this.syllabusForm.get('syllabus_file')?.updateValueAndValidity();
    }
  }


}
