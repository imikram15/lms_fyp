import { Component, ViewChild, getNgModuleById } from '@angular/core';
import { EmployeesService, EmployeesResponse } from '../../services/employees.service';
import { CategoriesService, CategoriesResponse } from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService, DesignationResponse } from '../../services/designations.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { environment } from '../../../environments/environment.development';
import { Paginator } from '../../paginator';
import { CommonService } from '../../services/common.service';
import { ToasterService } from '../../services/toastr.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent extends Paginator{

  searchTerm: any;
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
    public dialog: MatDialog,
    private toastr: ToasterService,
    public commonService:CommonService
    ) {
    super();
  }

  ngOnInit(): void {
    this.getDepartmentsList();
    this.getDesignationsList();
    this.getCategoriesList();
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.isLoading = true;
    this.employeeService.getPaginatedEmployees(this.page, this.perPage).subscribe((res: any) => {
      this.employees = res.employees.data;
      this.page = res.employees.current_page;
      this.total = res.employees.total; 
      this.perPage = res.employees.per_page;
      this.isLoading = false;
    }, (error: any) => {
      console.error('Error fetching employees:', error);
      this.toastr.showError('Failed to fetch employees. Please try again later.','Error');
      this.isLoading = false;
      }
  )
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
    this.isLoading = true;
    this.departmentSerivce.getDepartments().subscribe((res:any)=>{     
      this.departments = res.department;      
    this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching classes:', error);
      this.toastr.showError('Failed to fetch Categories. Please try again later.','Error');
      this.isLoading = false; 
    }
    )
  } 
  
  result: string = '';

  confirmDialog(id:string|number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: {data : dialogData , id:id, loc:'employee'},
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.getEmployeesList();
    });
  }


  onTableDataChange(event:any){
  this.page = event;
  console.log(this.page);  
  this.getEmployeesList();
  }



}
