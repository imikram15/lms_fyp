import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmployeesResponse{
  id:number,
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

  constructor(private httpclient:HttpClient) { }
  
  saveEmployee(employeeData:any){
    return this.httpclient.post('http://127.0.0.1:8000/api/employees', employeeData);
  }
  getEmployees(){
    return this.httpclient.get('http://127.0.0.1:8000/api/employees');
  }

  getEmployee(employeeID:number){
    return this.httpclient.get(`http://127.0.0.1:8000/api/employees/${employeeID}/edit`);
  }

  updateEmployee(employeeID: number, formData: any) {
    return this.httpclient.put(`http://127.0.0.1:8000/api/employees/${employeeID}/edit`, formData);
  }

  destroyEmployee(employeeID:number){
    return this.httpclient.delete(`http://127.0.0.1:8000/api/employees/${employeeID}/delete`);

  }

}
