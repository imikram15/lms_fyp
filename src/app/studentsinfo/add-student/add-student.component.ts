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
      // console.log('Form submitted:', this.studentForm.value);
      // console.log('Profile image:', profileImageControl ? profileImageControl.value : null);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
  
  imageURL:any;
  imagefile:any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.imagefile = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageURL = e.target?.result as string;
        console.log(this.imageURL); // Debugging
        // Update the form control value after setting the imageURL
       
      };
      reader.readAsDataURL(file);
    }
  }
}


