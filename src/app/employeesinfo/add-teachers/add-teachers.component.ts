import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { CategoriesService, CategoriesResponse } from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService, DesignationResponse } from '../../services/designations.service';
import { TeachersResponse, TeachersService } from '../../services/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';


@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html',
  styleUrl: './add-teachers.component.scss'
})
export class AddTeachersComponent {

  teachers: TeachersResponse[] = [];
  departments: DepartmentResponse[] = [];
  designations: DesignationResponse[] = [];
  categories: CategoriesResponse[] = [];
  teacherForm!: FormGroup;
  forUpdate: boolean = false;
  isLoading: boolean = false;
  @ViewChild('elseForm') elseForm: any;
  imageURL: string = "assets/img/profile.jpg";
  imgUrl = environment.mediaUrl;
  imagefile: File | undefined;
  teacherID: any;
  updateTeacher: any;
  errors: any = [];
  showPassword: boolean = false;
  passwordFieldType: string = 'password';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teachersService: TeachersService,
    private designationsService: DesignationsService,
    private categoriesService: CategoriesService,
    private departmentSerivce: DepartmentsService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      department_id: ['', Validators.required],
      designation_id: ['', Validators.required],
      category_id: ['', Validators.required],
      name: ['', Validators.required],
      father_name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$|^\+[0-9]{1,4}\s\([0-9]{1,4}\)\s[0-9]{1,4}(-[0-9]{1,4}){1,2}$/)]],
      joining_date: ['', Validators.required],
      address: ['', Validators.required],
      image: [null, Validators.required],
      blood_group: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]]
    });

    this.teacherID = this.route.snapshot.paramMap.get('id');

    if (this.teacherID) {
      this.isLoading = true;
      this.teachersService.getTeacher(this.teacherID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.updateTeacher = res;
          this.teacherForm.patchValue({
            department_id: this.updateTeacher.department_id || '',
            designation_id: this.updateTeacher.designation_id || '',
            category_id: this.updateTeacher.category_id || '',
            name: this.updateTeacher.name || '',
            father_name: this.updateTeacher.father_name || '',
            gender: this.updateTeacher.gender || '',
            dob: this.updateTeacher.dob || '',
            email: this.updateTeacher.email || '',
            phone: this.updateTeacher.phone || '',
            joining_date: this.updateTeacher.joining_date || '',
            address: this.updateTeacher.address || '',
            image: this.imgUrl + 'profile' + '/' + this.updateTeacher.image || ''

          });
          this.imageURL = this.imgUrl + 'profile' + '/' + this.updateTeacher.image
          this.isLoading = false;
        } else {
          console.error('Teacher data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching Teacher data:', error);
      });
    }
    if (this.forUpdate === true) {
      this.teacherForm.get('image')?.clearValidators();
    }

    this.getDepartmentsList();
    this.getDesignationsList();
    this.getCategoriesList();
    this.getTeachersList();
  }

  getTeachersList() {
    this.teachersService.getTeachers().subscribe((res: any) => {
      this.teachers = res.teacher;
    },
      (error: any) => {
        console.error('Error fetching Teachers:', error);
        this.toastr.showError('Failed to fetch Teachers. Please try again later.', 'Error');
      }
    )
  }

  getCategoriesList() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories = res.category;
    },
      (error: any) => {
        console.error('Error fetching Categories:', error);
        this.toastr.showError('Failed to fetch Categories. Please try again later.', 'Error');
      }
    )
  }

  getDesignationsList() {
    this.designationsService.getDesignations().subscribe((res: any) => {
      this.designations = res.designation;
    },
      (error: any) => {
        console.error('Error fetching Designations:', error);
        this.toastr.showError('Failed to fetch Designations. Please try again later.', 'Error');
      }
    )
  }

  getDepartmentsList() {
    this.departmentSerivce.getDepartments().subscribe((res: any) => {
      this.departments = res.department;
    },
      (error: any) => {
        console.error('Error fetching Departments:', error);
        this.toastr.showError('Failed to fetch Departments. Please try again later.', 'Error');
      }
    )
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

  onSubmit() {
    if (this.teacherForm.valid) {
      const formData = new FormData();

      Object.keys(this.teacherForm.value).forEach(key => {
        formData.append(key, this.teacherForm.value[key]);
      });

      if (this.imagefile) {
        formData.append('image', this.imagefile);
      }

      if (this.forUpdate === true) {

        this.teachersService.updateTeacher(this.teacherID, formData).subscribe({
          next: (res: any) => {
            console.log(res, 'response');
            this.teacherForm.reset();
            this.router.navigate(['/teachers']);
            this.toastr.showSuccess('Teacher updated successfully!', 'Success');
          },
          error: (err: any) => {
            this.handle422Error(err);
            console.error(err);
          }
        });
      } else {
        this.teachersService.saveTeacher(formData).subscribe({
          next: (res: any) => {
            console.log(res, 'response');
            this.teacherForm.reset();
            this.router.navigate(['/teachers']);
            this.toastr.showSuccess('Teacher added successfully!', 'Success');
          },
          error: (err: any) => {
            this.handle422Error(err);
            console.error(err);
          }
        });
      }
    } else {
      this.teacherForm.markAllAsTouched();
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }
}
