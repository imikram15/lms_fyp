import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  baseURL = environment.apiUrl; 

  constructor(private http: HttpClient) {    
  }

  createSyllabus(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}syllabus`, data);
  }
  updateSyllabus(id: number, data: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}syllabus/${id}/edit`, data);
  }

  deleteSyllabus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}syllabus/${id}/delete`);
  }

  getSyllabus(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}syllabus/${id}`);
  }

  getSyllabusByClass(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}getsyllabusByClass/${id}`);
  }
   filterSyllabusByType(memberType: string, memberId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}syllabusByType`, {
     params:{
       member_type: memberType,
      member_id: memberId
     }
    });
  }
   getClassesByType(memberType: string, memberId: number) {
  return this.http.get<any>(`${this.baseURL}classesByType`, {
    params: {
      member_type: memberType,
      member_id: memberId.toString()
    }
  });
}
  getSyllabuses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}syllabus`);
  }

  getClasses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classes`);
  }

  getSubjects(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}subjects`);
  }
}
