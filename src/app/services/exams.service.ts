import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  
  constructor(private http:HttpClient) { }

  baseURL = environment.apiUrl;

  getExamsByClass(classId: number): Observable<any> {
    return this.http.get(`${this.baseURL}getExamByClass/${classId}`,{
      params: { class_id: classId.toString() }
    });
  }
  filterExamsByType(member_type:any,member_id: any): Observable<any> {
    return this.http.get<any>(`${this.baseURL}examByType/`, {
      params: { member_type: member_type,
        member_id: member_id.toString()
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
  getExams(): Observable<any> {
    return this.http.get(this.baseURL+'exams');
  }

  getPgExams(page: number|string, pageSize: number|string) {
    
    return this.http.get(`${this.baseURL}exams?page=${page}&pageSize=${pageSize}`);
  } 
  createExam(exam: any): Observable<any> {
    return this.http.post(this.baseURL+'exams', exam);
  }

  getExam(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}exams/${id}`);
  }

  updateExam(id: number, exam: any): Observable<any> {
    return this.http.post(`${this.baseURL}exams/${id}/edit`, exam);
  }

  deleteExam(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}exams/${id}/delete`);
  }

  getClassrooms(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classrooms`);
  }

  getSubjects(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}subjects`);
  }
  
  getExamCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}examCategories`);
  }
  getclasses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classes`);
  }
}
