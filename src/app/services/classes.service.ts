import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClassesResponse{
  id:number,
  title:string,
  created_at:Date,
  updated_at:Date,
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpclient:HttpClient) { }

  baseURL = environment.apiUrl;
  
  saveClasses(classData:any){
    return this.httpclient.post( this.baseURL + 'classes', classData);
  }
  
  getClasses(){
    return this.httpclient.get( this.baseURL + 'classes');    
  }

  getPaginatedClasses(page: number|string, pageSize: number|string): Observable<ClassesResponse[]> {
    
    return this.httpclient.get<ClassesResponse[]>(`${this.baseURL}classes?page=${page}&pageSize=${pageSize}`);
  } 
  getClass(classID:number){
    return this.httpclient.get( this.baseURL + `classes/${classID}/edit`);
  }

  updateClass(classID: number, formData: any) {
    return this.httpclient.put(this.baseURL + `classes/${classID}/edit`, formData);
  }

  destroyClass(classID:number){
    return this.httpclient.delete(this.baseURL + `classes/${classID}/delete`);
  }

   getClassesByType(memberType: string, memberId: number) {
  return this.httpclient.get<any>(`${this.baseURL}classesByType`, {
    params: {
      member_type: memberType,
      member_id: memberId.toString()
    }
  });
}
}
