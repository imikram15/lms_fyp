import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService, EmployeesResponse } from '../../services/employees.service';
import { CategoriesService, CategoriesResponse} from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService,DesignationResponse } from '../../services/designations.service';


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
  
  constructor( private fb:FormBuilder ,
    private employeeService:EmployeesService,
    private designationsService:DesignationsService,
    private categoriesService:CategoriesService, 
    private departmentSerivce:DepartmentsService ){}

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
    this.designationsService.getDesignation().subscribe((res:any)=>{     
      this.designations = res.designation;
    })
  }

  getDepartmentsList() {
    this.departmentSerivce.getDepartment().subscribe((res:any)=>{     
      this.departments = res.department;
    })
  }


onSubmit() {
  this.employeeService.saveEmployee(this.employeeForm.value).subscribe({
    next:(res:any)=>{
      console.log(res,'response');  
      this.employeeForm.reset();      
    },
    error:(err:any)=>{
      this.errors = err.error.errors;
      console.log(err);
    }
  });
}

}
