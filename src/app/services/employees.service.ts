import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


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
    return this.httpclient.post( this.baseUrl + '/employees', employeeData);
  }
  getEmployees(){
    return this.httpclient.get( this.baseUrl + '/employees');
  }

  getEmployee(employeeID:number){
    return this.httpclient.get( this.baseUrl + `/employees/${employeeID}/edit`);
  }

  updateEmployee(employeeID: number, formData: any) {
    return this.httpclient.put(this.baseUrl + `/employees/${employeeID}/edit`, formData);
  }

  destroyEmployee(employeeID:number){
    return this.httpclient.delete( this.baseUrl + `/api/employees/${employeeID}/delete`);

  }

}
