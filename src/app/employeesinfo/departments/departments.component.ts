import { Component } from '@angular/core';
import { DepartmentsService, DepartmentResponse } from '../../services/departments.service';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {

  departments: DepartmentResponse[] = [];

  constructor(private departmentSerivce:DepartmentsService ) { }

  ngOnInit(): void {
    this.getDepartmentsList();
  }

  getDepartmentsList() {
    this.departmentSerivce.getDepartment().subscribe((res:any)=>{     
      this.departments = res.department;
    })
  }

}
