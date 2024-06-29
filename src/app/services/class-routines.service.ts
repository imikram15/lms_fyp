import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClassRoutinesService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {    
  }

  getClasses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classes`);
  }

  getRoutines(classId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}routineByClass/${classId}`, {
      params: { class_id: classId.toString() }
    });
  }

  getRoutineByType(member_type:any,member_id: any): Observable<any> {
    return this.http.get<any>(`${this.baseURL}routineByType/`, {
      params: { member_type: member_type,
        member_id: member_id.toString()
       }
    });
  }

  getRoutine(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}routines/${id}`);
  }

  createRoutine(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}routines`, data);
  }

  updateRoutine(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}routines/${id}/edit`, data);
  }

  deleteRoutine(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}routines/${id}/delete`);
  }

  getTeachers(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}teachers`);
  }

  getClassrooms(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classrooms`);
  }

  getSubjects(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}subjects`);
  }
}
