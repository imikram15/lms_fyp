import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

export interface SubjectResponse{
  id:number,
  title:string,
  classes:any,
  created_at:Date,
  updated_at:Date,
}
@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private httpclient:HttpClient) { }

  baseURL = environment.apiUrl;

  getClasses(){
    return this.httpclient.get( this.baseURL + 'classes');    
  }

  getSubjectsByClass(classId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseURL}subjectsByClass/${classId}`, {
      params: { class_id: classId.toString() }
    });
  }
  filterSubjectsByType(member_type:any,member_id: any): Observable<any> {
    return this.httpclient.get<any>(`${this.baseURL}subjectByType/`, {
      params: { member_type: member_type,
        member_id: member_id.toString()
       }
    });
  }
  
  saveSubjects(classData:any){
    return this.httpclient.post( this.baseURL + 'subjects', classData);
  }
  
  getSubjects(){
    return this.httpclient.get( this.baseURL + 'subjects');    
  }

  getPaginatedSubjects(page: number|string, pageSize: number|string): Observable<SubjectResponse[]> {
    
    return this.httpclient.get<SubjectResponse[]>(`${this.baseURL}subjects?page=${page}&pageSize=${pageSize}`);
  } 
  getSubject(classID:number){
    return this.httpclient.get( this.baseURL + `subjects/${classID}/edit`);
  }

  updateSubject(classID: number, formData: any) {
    return this.httpclient.post(this.baseURL + `subjects/${classID}/edit`, formData);
  }

  destroySubject(classID:number){
    return this.httpclient.delete(this.baseURL + `subjects/${classID}/delete`);
  }
}
