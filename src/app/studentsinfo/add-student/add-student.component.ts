import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  classOptions = ['Class One', 'Class Two', 'Class Three', 'Class Four'];
sectionOptions: any;
subjectOptions: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      b_form: ['', Validators.required],
      father_name: ['', Validators.required],
      father_cnic: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      address: ['', Validators.required],
      class: ['', Validators.required],
      profileImage: [null]
    });
  }

  
  onSubmit() {
    if (this.studentForm.valid) {
      const formData = new FormData();

      const profileImageControl = this.studentForm.get('profileImage');
      if (profileImageControl && profileImageControl.value) {
        formData.append('profileImage', profileImageControl.value);
      } 
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

imageURL:string = "assets/img/profile.jpg";
imagefile: File | undefined;

onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    this.imagefile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    this.imageURL = "assets/img/profile.jpg";
    this.imagefile = undefined;
  }
}




}


