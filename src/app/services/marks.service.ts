import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MarksService {
  
  constructor(private http:HttpClient) { }

  baseURL = environment.apiUrl;

  
  getMarks(data: any): Observable<any> {
    return this.http.get(`${this.baseURL}marks`, {
      params: {
        class_id: data.class_id,
        examCategory_id: data.examCategory_id,
        subject_id: data.subject_id,
      },
    });
  }

  storeMark(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}marks`, data);
  }
  
  updateMark( mark: any): Observable<any> {
    return this.http.post(`${this.baseURL}marks/${mark.id}/edit`, mark);
  }

  deleteMark(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}marks/${id}/delete`);
  }


  getStudents(): Observable<any> {
    return this.http.get(`${this.baseURL}students`);
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
