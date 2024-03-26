import { Component, ViewChild } from '@angular/core';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
 
  @ViewChild('elseForm') elseForm: any;
  isLoading:boolean = false;
  departments: DepartmentResponse[] = [];

  constructor(private departmentSerivce:DepartmentsService ) { }

  ngOnInit(): void {
    this.getDepartmentsList();
  }

  getDepartmentsList() {    
    this.isLoading = true;
    this.departmentSerivce.getDepartments().subscribe((res:any)=>{     
      this.departments = res.department;      
    this.isLoading = false;
    })
  }

  deleteDepartment(departmentID: number) {
    if(confirm("Are you sure! You want to Delete?")){
      this.departmentSerivce.destroyDepartment(departmentID).subscribe( (res: any) => {
        this.getDepartmentsList();
        alert(res.message);   })
    }
    }

}
