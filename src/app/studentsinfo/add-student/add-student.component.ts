import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';
import { environment } from '../../../environments/environment.development';
import { ClassesResponse, ClassesService } from '../../services/classes.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  classOptions: ClassesResponse[]= [];
  sectionOptions: any;
  subjectOptions: any;
  isLoading:boolean = false;
  forUpdate: boolean = false;
  studentID: any;
  UpdateStudent:any;
  imagefile: File | undefined;
  imageURL: string = "assets/img/profile.jpg";
  imgUrl = environment.mediaUrl;
  showPassword: boolean = false;
  passwordFieldType: string = 'password';


  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentsSerivce:StudentsService,
    private router: Router,
    private toastr: ToasterService,
    private classesService:ClassesService ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      roll_no: ['', Validators.required],  
      class_id: ['', Validators.required],
      b_form: ['', [Validators.required ,Validators.pattern(/^\d{5}-\d{7}-\d{1}$/ )]],
      father_name: ['', Validators.required],
      father_cnic: ['', [Validators.required ,Validators.pattern(/^\d{5}-\d{7}-\d{1}$/)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$|^\+[0-9]{1,4}\s\([0-9]{1,4}\)\s[0-9]{1,4}(-[0-9]{1,4}){1,2}$/)]],
      address: ['', Validators.required],
      blood_group: ['', Validators.required],
      image: [null]
    });

    this.studentID = this.route.snapshot.paramMap.get('id');

    if (this.studentID) {
      this.isLoading = true;
      this.studentsSerivce.getStudent(this.studentID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.UpdateStudent = res;
          this.studentForm.patchValue({
            first_name: this.UpdateStudent.first_name || '',
            last_name: this.UpdateStudent.last_name || '',
            class_id: this.UpdateStudent.class_id || '',
            roll_no: this.UpdateStudent.roll_no || '',
            b_form: this.UpdateStudent.b_form || '',
            father_name: this.UpdateStudent.father_name || '',
            father_cnic: this.UpdateStudent.father_cnic || '',
            gender: this.UpdateStudent.gender || '',
            dob: this.UpdateStudent.dob || '',
            email: this.UpdateStudent.email || '',
            phone: this.UpdateStudent.phone || '',
            address: this.UpdateStudent.address || '',
            blood_group: this.UpdateStudent.blood_group || '',
            image: this.imgUrl + 'profile' + '/' + this.UpdateStudent.image || ''
            
          });
          this.imageURL = this.imgUrl + 'profile' + '/' + this.UpdateStudent.image
          this.isLoading = false;
        } else {
          console.error('Student data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching Student data:', error);
      });
    }
    
    this.getClasses();
  }

  getClasses(){
    this.classesService.getClasses().subscribe((res: any) => {
      this.classOptions = res.classes.data;
    },
    (error: any) => {
      console.error('Error fetching Classes:', error);
      this.toastr.showError('Failed to fetch Classes. Please try again later.','Error');
    }
    )
  }
  
  onSubmit() {
    console.log(this.studentForm.valid);
    
    if (this.studentForm.valid) {
      const formData = new FormData();

      Object.keys(this.studentForm.value).forEach(key => {
        formData.append(key, this.studentForm.value[key]);
      });

      if (this.imagefile) {
        formData.append('image', this.imagefile);
      }

      if (this.forUpdate) {
        this.studentsSerivce.updateStudent(this.studentID, formData).subscribe({
          next: (res: any) => {
            console.log(res, 'response');
            this.studentForm.reset();
            this.router.navigate(['/students']);
            this.toastr.showSuccess('Student updated successfully!', 'Success');
          },
          error: (err: any) => {
            this.handle422Error(err);
            console.error(err);
          }
        });
      } else {
        this.studentsSerivce.saveStudent(formData).subscribe({
          next: (res: any) => {
            console.log(res, 'response');
            this.studentForm.reset();
            this.router.navigate(['/students']);
            this.toastr.showSuccess('Student added successfully!', 'Success');
          },
          error: (err: any) => {
            this.handle422Error(err);
            console.error(err);
          }
        });
      }
    } else {
      this.studentForm.markAllAsTouched();
    }
  }


  onFileSelected(event: any) {
    const image: File = event.target.files[0];

    if (image) {
      this.imagefile = image;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageURL = e.target?.result as string;
      };
      reader.readAsDataURL(image);
    } else {
      this.imageURL = "assets/img/profile.jpg";
      this.imagefile = undefined;
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


