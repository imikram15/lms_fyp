import { Component } from '@angular/core';
import { EmployeesService, EmployeesResponse } from '../../services/employees.service';
import { CategoriesService, CategoriesResponse} from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService,DesignationResponse } from '../../services/designations.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

  employees: EmployeesResponse[] = [];
  departments: DepartmentResponse[] = [];
  designations: DesignationResponse[] = [];
  categories: CategoriesResponse[] = [];

  constructor(private employeeService:EmployeesService,
    private designationsService:DesignationsService,
    private categoriesService:CategoriesService, 
    private departmentSerivce:DepartmentsService ) { }

  ngOnInit(): void {
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

}
