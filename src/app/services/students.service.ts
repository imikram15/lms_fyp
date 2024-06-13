import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentsResponse{
  id:number,
  roll_no:number,
  image:string,
  first_name: string,
  last_name: string,
  father_name: string,
  classes:any,
  gender:string,        
  dob: Date,
  email: string,
  phone: number,
  address: string, 
  created_at:Date,
  updated_at:Date,
}


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl = environment.apiUrl

  constructor(private httpclient:HttpClient) { }
  
  saveStudent(studentData:any){
    return this.httpclient.post( this.baseUrl + 'students', studentData);
  }
  getStudents(): Observable<any> {
    return this.httpclient.get( this.baseUrl + 'students');
  }
   getStudentsCount(): Observable<any> {
    return this.httpclient.get( this.baseUrl + 'studentsCount');
  }

  getStudentsByClass(classId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}studentsByClass/${classId}`, {
      params: { class_id: classId.toString() }
    });
  }

  getPaginatedStudents(page: number|string, pageSize: number|string): Observable<StudentsResponse[]> {
    return this.httpclient.get<StudentsResponse[]>(`${this.baseUrl}students?page=${page}&pageSize=${pageSize}`);
  }  

  getStudent(studentID:number){
    return this.httpclient.get( this.baseUrl + `students/${studentID}/edit`);
  }

  updateStudent(studentID: number, formData: any) {
    return this.httpclient.post(this.baseUrl + `students/${studentID}/edit`, formData);
  }

  destroyStudent(studentID:number){
    return this.httpclient.delete( this.baseUrl + `students/${studentID}/delete`);
  }

  getClasses(): Observable<any> {
    return this.httpclient.get( this.baseUrl + 'classes');
  }
}
