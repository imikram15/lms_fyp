import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';


export interface TeachersResponse{
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
  password:string,
  blood_group:string,
  phone: number,
  joining_date: Date,
  address: string, 
  created_at:Date,
  updated_at:Date,
}
@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  baseUrl = environment.apiUrl

  constructor(private httpclient:HttpClient) { }
  
  saveTeacher(teacherData:any){
    return this.httpclient.post( this.baseUrl + 'teachers', teacherData);
  }
  getTeachers(): Observable<any> {
    return this.httpclient.get( this.baseUrl + 'teachers');
  }
  getTeachersCount(): Observable<any> {
    return this.httpclient.get( this.baseUrl + 'teachersCount');
  }

  getPaginatedTeachers(page: number|string, pageSize: number|string): Observable<TeachersResponse[]> {
    return this.httpclient.get<TeachersResponse[]>(`${this.baseUrl}teachers?page=${page}&pageSize=${pageSize}`);
  }  

  getTeacher(teacherID:number){
    return this.httpclient.get( this.baseUrl + `teachers/${teacherID}/edit`);
  }

  updateTeacher(teacherID: number, formData: any) {
    return this.httpclient.post(this.baseUrl + `teachers/${teacherID}/edit`, formData);
  }

  destroyTeacher(teacherID:number){
    return this.httpclient.delete( this.baseUrl + `teachers/${teacherID}/delete`);

  }

}
