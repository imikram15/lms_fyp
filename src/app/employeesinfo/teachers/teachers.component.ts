import { Component, ViewChild } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { CategoriesService, CategoriesResponse } from '../../services/categories.service';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { DesignationsService, DesignationResponse } from '../../services/designations.service';
import { TeachersResponse, TeachersService } from '../../services/teachers.service';
import { environment } from '../../../environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from '../../paginator';

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

  constructor( private designationsService: DesignationsService,
    private categoriesService: CategoriesService,
    private departmentSerivce: DepartmentsService,
    private teachersService:TeachersService,
    public dialog: MatDialog,) {
    super();
  }

  ngOnInit(): void {
    this.getDepartmentsList();
    this.getDesignationsList();
    this.getCategoriesList();
    this.getStudentsList();
  }

  getStudentsList() {
    this.isLoading = true;
    this.teachersService.getPaginatedTeachers(this.page, this.perPage).subscribe((res: any) => {
      this.teachers = res.teachers.data;
      this.page = res.teachers.current_page;
      this.total = res.teachers.total; 
      this.perPage = res.teachers.per_page;
      
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

  onTableDataChange(event:any){
    this.page = event;
    console.log(this.page);  
    this.getStudentsList();
    }

  

}
