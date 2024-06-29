import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentFeeService {

  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStudentFeesByClass(data:any): Observable<any> {
    return this.http.get(`${this.baseURL}studentFee`, {
      params: { class_id: data.class_id,
        status: data.status,
        start_date: data.start_date,
        end_date: data.end_date
       }
    });
  }
  
  createStudentFee(studentFee: any): Observable<any> {
    return this.http.post(`${this.baseURL}studentFee`, studentFee);
  }

  createBulkStudentFees(data: any) {
    return this.http.post(`${this.baseURL}bulkStudentFee`, data);
  }

  getStudentFee(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}studentFee/${id}`);
  }

  updateStudentFee(id: number, studentFee: any): Observable<any> {
    return this.http.post(`${this.baseURL}studentFee/${id}/edit`, studentFee);
  }

  deleteStudentFee(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}studentFee/${id}/delete`);
  }

  getClasses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classes`);
  }

  getStudents(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}students`);
  }

   getStudentFees(data:any): Observable<any> {
     return this.http.get(`${this.baseURL}studentFeeByType`, {
      params: { 
        member_type:data.member_type,
        member_id:data.member_id,
        status: data.status,
        start_date: data.start_date,
        end_date: data.end_date,
        page:1,
        per_page:10,
       }
    });

  }
}
