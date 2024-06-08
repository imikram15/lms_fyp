import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface ClassroomResponse{
  id:number,
  title:string,
  created_at:Date,
  updated_at:Date,
}

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {

  constructor(private http: HttpClient) { }
  
  baseURL = environment.apiUrl;

  getClasses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classes`);
  }

  getClassrooms(): Observable<any> {
    return this.http.get(this.baseURL + 'classrooms');
  }

  getPaginatedClassrooms(page: number|string, pageSize: number|string): Observable<ClassroomResponse[]> {
    
    return this.http.get<ClassroomResponse[]>(`${this.baseURL}classrooms?page=${page}&pageSize=${pageSize}`);
  } 

  getClassroom(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}classrooms/${id}/edit`);
  }

  createClassroom(classroom: any): Observable<any> {
    return this.http.post(this.baseURL + 'classrooms', classroom);
  }

  updateClassroom(id: number, classroom: any): Observable<any> {
    return this.http.put(this.baseURL + `classrooms/${id}/edit`, classroom);
  }

  deleteClassroom(id: number): Observable<any> {
    return this.http.delete(this.baseURL + `classrooms/${id}/delete`);
  }
}
