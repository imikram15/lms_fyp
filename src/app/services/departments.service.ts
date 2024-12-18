import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface DepartmentResponse{
  id:number,
  title:string,
  created_at:Date,
  updated_at:Date,
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private httpclient:HttpClient) { }

  baseURL:any = environment.apiUrl;

  getDepartments(){
    return this.httpclient.get( this.baseURL + 'departments');
  }

  saveDepartment(departmentData:any){
    return this.httpclient.post( this.baseURL + 'departments', departmentData);
  }
  getDepartment(departmentID:number){
    return this.httpclient.get( this.baseURL + `departments/${departmentID}/edit`);
  }

  updateDepartment(departmentID: number, formData: any) {
    return this.httpclient.put(this.baseURL + `departments/${departmentID}/edit`, formData);
  }

  destroyDepartment(departmentID:number){
    return this.httpclient.delete(this.baseURL + `departments/${departmentID}/delete`);
  }
}
