import { Component, ViewChild } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { CategoriesService, CategoriesResponse } from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService, DesignationResponse } from '../../services/designations.service';
import { TeachersResponse, TeachersService } from '../../services/teachers.service';
import { environment } from '../../../environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from '../../paginator';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { CommonService } from '../../services/common.service';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent extends Paginator{

  departments: DepartmentResponse[] = [];
  designations: DesignationResponse[] = [];
  categories: CategoriesResponse[] = [];
  teachers: TeachersResponse[] = [];
  imgUrl = environment.mediaUrl;
  @ViewChild('elseForm') elseForm: any;
  isLoading:boolean = false;
  searchTerm: any;
  result: string = '';

  constructor( private designationsService: DesignationsService,
    private categoriesService: CategoriesService,
    private departmentSerivce: DepartmentsService,
    private teachersService:TeachersService,
    public dialog: MatDialog,
    private toastr: ToasterService,
    public commonService:CommonService) {
    super();
  }

  ngOnInit(): void {    
    this.getDepartmentsList();
    this.getDesignationsList();
    this.getCategoriesList();
    this.getTeachersList();
  }

  getTeachersList() {
    this.isLoading = true;
    this.teachersService.getPaginatedTeachers(this.page, this.perPage).subscribe((res: any) => {
      this.teachers = res.teachers.data;
      this.page = res.teachers.current_page;
      this.total = res.teachers.total; 
      this.perPage = res.teachers.per_page;      
      this.isLoading = false;
    }, (error: any) => {
      console.error('Error fetching Teachers:', error);
      this.toastr.showError('Failed to fetch Teachers. Please try again later.','Error');
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
      console.error('Error fetching Departments:', error);
      this.toastr.showError('Failed to fetch Departments. Please try again later.','Error');
      this.isLoading = false; 
    }
    )
  } 

  confirmDialog(id:string|number): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: {data : dialogData , id:id, loc:'teacher'},
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.getTeachersList();
    });
  }

  onTableDataChange(event:any){
    this.page = event;
    console.log(this.page);  
    this.getTeachersList();
    }

  

}
