import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getDepartment(){
    return this.httpclient.get('http://127.0.0.1:8000/api/departments');
  }

  saveDepartment(departmentData:any){
    return this.httpclient.post('http://127.0.0.1:8000/api/departments', departmentData);
  }
}
