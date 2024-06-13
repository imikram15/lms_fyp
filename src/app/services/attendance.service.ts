import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClasses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}classes`);
  }

  getStudents(classId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}studentsByClass/${classId}`, {
      params: { class_id: classId.toString() }
    });
  }

  getAttendanceWeekly(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}attendances/weekly`);
  }
  getAttendances(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}attendances`);
  }

  postAttendance(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}attendances`, data);
  }

  getAttendanceStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}attendance_status`);
  }

  getAttendance(classId: number, month: string, year: string): Observable<any> {
    const params = { 
      class_id: classId.toString(), 
      month: month, 
      year: year 
    };
    return this.http.get<any>(`${this.baseURL}attendances`, { params });
  }
  

  updateAttendance(attendanceData: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseURL}attendances`, attendanceData);
  }

  deleteAttendance(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}attendances/${id}/delete`);
  }
}
