import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService, EmployeesResponse } from '../../services/employees.service';
import { CategoriesService, CategoriesResponse} from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService,DesignationResponse } from '../../services/designations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';




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
  errors:any =[];
  forUpdate:boolean = false;
  employeeID: any;
  employee: any;
  
  constructor( private fb:FormBuilder ,
    private route:ActivatedRoute,
    private router:Router,
    private employeeService:EmployeesService,
    private designationsService:DesignationsService,
    private categoriesService:CategoriesService, 
    private departmentSerivce:DepartmentsService,
    private toastr:ToasterService,
    ){ }

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
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      joining_date: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.employeeID = this.route.snapshot.paramMap.get('id');
    
    if (this.employeeID) {
      this.employeeService.getEmployee(this.employeeID).subscribe((res: any) => {
        if (res && res.id) { 
          this.forUpdate = true;
          this.employee = res; 
          this.employeeForm.patchValue({
            department_id: this.employee.department_id || '', 
            designation_id: this.employee.designation_id || '', 
            category_id: this.employee.category_id || '', 
            name: this.employee.name || '', 
            father_name: this.employee.father_name || '', 
            gender: this.employee.gender || '',
            dob: this.employee.dob || '', 
            email: this.employee.email || '',
            phone: this.employee.phone || '', 
            joining_date: this.employee.joining_date || '', 
            address: this.employee.address || '' 
          });
        } else {
          console.error('Employee data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching employee data:', error);
      });
    }

      this.getDepartmentsList();
      this.getDesignationsList();
      this.getCategoriesList();
      this.getEmployeesList();

  }

  getEmployeesList() {
    this.employeeService.getEmployees().subscribe((res:any)=>{     
      this.employees = res.employees;
    })
  }
  getCategoriesList() {
    this.categoriesService.getCategories().subscribe((res:any)=>{     
      this.categories = res.category;
    })
  }

  getDesignationsList() {
    this.designationsService.getDesignations().subscribe((res:any)=>{     
      this.designations = res.designation;
    })
  }

  getDepartmentsList() {
    this.departmentSerivce.getDepartments().subscribe((res:any)=>{     
      this.departments = res.department;
    })
  }

  
onSubmit() {
  const formData = this.employeeForm.value;

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
