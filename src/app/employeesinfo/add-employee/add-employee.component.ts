import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService, EmployeesResponse } from '../../services/employees.service';
import { CategoriesService, CategoriesResponse } from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService, DesignationResponse } from '../../services/designations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  employees: EmployeesResponse[] = [];
  departments: DepartmentResponse[] = [];
  designations: DesignationResponse[] = [];
  categories: CategoriesResponse[] = [];
  employeeForm!: FormGroup;
  errors: any = [];
  forUpdate: boolean = false;
  employeeID: any;
  updateEmployee: any;
  imageURL: string = "assets/img/profile.jpg";
  imgUrl = environment.mediaUrl;
  imagefile: File | undefined;
  isLoading:boolean = false;
  @ViewChild('elseForm') elseForm: any;
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeesService,
    private designationsService: DesignationsService,
    private categoriesService: CategoriesService,
    private departmentSerivce: DepartmentsService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
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
    });
    
   
    this.employeeID = this.route.snapshot.paramMap.get('id');
    console.log(this.employeeID);
    

    if (this.employeeID != null) {
      this.isLoading = true;
      this.employeeService.getEmployee(this.employeeID).subscribe((res: any) => {
        if (res && res.id) {
          this.forUpdate = true;
          this.updateEmployee = res;
          this.employeeForm.patchValue({
            department_id: this.updateEmployee.department_id || '',
            designation_id: this.updateEmployee.designation_id || '',
            category_id: this.updateEmployee.category_id || '',
            name: this.updateEmployee.name || '',
            father_name: this.updateEmployee.father_name || '',
            gender: this.updateEmployee.gender || '',
            dob: this.updateEmployee.dob || '',
            email: this.updateEmployee.email || '',
            phone: this.updateEmployee.phone || '',
            joining_date: this.updateEmployee.joining_date || '',
            address: this.updateEmployee.address || '',
            blood_group: this.updateEmployee.blood_group || '',
            image: this.imgUrl + 'profile' + '/' + this.updateEmployee.image || ''            
          });
          this.imageURL = this.imgUrl + 'profile' + '/' + this.updateEmployee.image
          this.isLoading = false;
        } else {
          console.error('Employee data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching employee data:', error);
      });
    }
    if(this.forUpdate === true){
      this.employeeForm.get('image')?.clearValidators();      
    }

    this.getDepartmentsList();
    this.getDesignationsList();
    this.getCategoriesList();

  }

  getCategoriesList() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories = res.category;      
    },
    (error: any) => {
      console.error('Error fetching Categories:', error);
      this.toastr.showError('Failed to fetch Categories. Please try again later.','Error');
    }
    )
  }

  getDesignationsList() {
    this.designationsService.getDesignations().subscribe((res: any) => {
      this.designations = res.designation;
    },
    (error: any) => {
      console.error('Error fetching Designations:', error);
      this.toastr.showError('Failed to fetch Designations. Please try again later.','Error');
    }
    )
  }

  getDepartmentsList() {
    this.departmentSerivce.getDepartments().subscribe((res: any) => {
      this.departments = res.department;
    },
    (error: any) => {
      console.error('Error fetching Departments:', error);
      this.toastr.showError('Failed to fetch Departments. Please try again later.','Error');
    }
    )
  }


  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = new FormData();

      Object.keys(this.employeeForm.value).forEach(key => {
        formData.append(key, this.employeeForm.value[key]);
      });

      if (this.imagefile) {
        formData.append('image', this.imagefile);
      }

      if (this.forUpdate) {
          
        this.employeeService.updateEmployee(this.employeeID, formData).subscribe({
          next: (res: any) => {
            console.log(res, 'response');
            this.employeeForm.reset();
            this.router.navigate(['/employees']);
            this.toastr.showSuccess('Employee updated successfully!', 'Success');
          },
          error: (err: any) => {
            this.handle422Error(err);
            console.error(err);
          }

        });
      } else {
        this.employeeService.saveEmployee(formData).subscribe({
          next: (res: any) => {
            console.log(res, 'response');
            this.employeeForm.reset();
            this.router.navigate(['/employees']);
            this.toastr.showSuccess('Employee added successfully!', 'Success');
          },
          error: (err: any) => {
            this.handle422Error(err);
            console.error(err);
          }
        });
      }
    } else {
      this.employeeForm.markAllAsTouched();
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
