import { Component, ViewChild, getNgModuleById } from '@angular/core';
import { EmployeesService, EmployeesResponse } from '../../services/employees.service';
import { CategoriesService, CategoriesResponse } from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService, DesignationResponse } from '../../services/designations.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { environment } from '../../../environments/environment.development';

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
  imgUrl = environment.mediaUrl;

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;

  constructor(private employeeService: EmployeesService,
    private designationsService: DesignationsService,
    private categoriesService: CategoriesService,
    private departmentSerivce: DepartmentsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDepartmentsList();
    this.getDesignationsList();
    this.getCategoriesList();
    this.getEmployeesList();
  }
  getEmployeesList() {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe((res: any) => {
      this.employees = res.employees;
      this.isLoading = false;
    })
  }
  getCategoriesList() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories = res.category;
    })
  }

  getDesignationsList() {
    this.designationsService.getDesignations().subscribe((res: any) => {
      this.designations = res.designation;
    })
  }

  getDepartmentsList() {
    this.departmentSerivce.getDepartments().subscribe((res: any) => {
      this.departments = res.department;
    })
  }  
  
  result: string = '';

  confirmDialog(id:string|number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      position: { left: '35%' },
      data: {data : dialogData , id:id},
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.getEmployeesList();
    });
  }

}
