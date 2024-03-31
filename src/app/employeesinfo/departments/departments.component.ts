import { Component, ViewChild } from '@angular/core';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';
import { ToasterService } from '../../services/toastr.service';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
 
  @ViewChild('elseForm') elseForm: any;
  isLoading:boolean = false;
  departments: DepartmentResponse[] = [];

  constructor(private departmentSerivce:DepartmentsService,
    private toastr: ToasterService ) { }

  ngOnInit(): void {
    this.getDepartmentsList();
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

  deleteDepartment(departmentID: number) {
    if(confirm("Are you sure! You want to Delete?")){
      this.departmentSerivce.destroyDepartment(departmentID).subscribe( (res: any) => {
        this.getDepartmentsList();
        alert(res.message);   })
    }
    }

}
