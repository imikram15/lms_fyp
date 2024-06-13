import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


export interface EmployeesResponse{
  id:number,
  image:string,
  department_id:number,
  designation_id: number,
  category_id :number,
  name: string,
  father_name: string,
  gender:string,        
  dob: Date,
  email: string,
  phone: number,
  joining_date: Date,
  address: string, 
  created_at:Date,
  updated_at:Date,
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseUrl = environment.apiUrl

  constructor(private httpclient:HttpClient) { }
  
  saveEmployee(employeeData:any){
    return this.httpclient.post( this.baseUrl + 'employees', employeeData);
  }
  getEmployees(): Observable<any> {
    return this.httpclient.get( this.baseUrl + 'employees');
  }
  
  getEmployeesCount(): Observable<any> {
    return this.httpclient.get( this.baseUrl + 'employeesCount');
  }  

  getPaginatedEmployees(page: number|string, pageSize: number|string): Observable<EmployeesResponse[]> {
    return this.httpclient.get<EmployeesResponse[]>(`${this.baseUrl}employees?page=${page}&pageSize=${pageSize}`);
  }  

  getEmployee(employeeID:number){
    return this.httpclient.get( this.baseUrl + `employees/${employeeID}/edit`);
  }

  updateEmployee(employeeID: number, formData: any) {
    return this.httpclient.post(this.baseUrl + `employees/${employeeID}/edit`, formData);
  }

  destroyEmployee(employeeID:number){
    return this.httpclient.delete( this.baseUrl + `employees/${employeeID}/delete`);

  }

}
