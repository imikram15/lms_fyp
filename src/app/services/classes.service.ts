import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

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


  getClasses(){
    return this.httpclient.get( this.baseURL + 'school_class');
    
  }

  saveClasses(classData:any){
    return this.httpclient.post( this.baseURL + 'school_class', classData);
  }

  getClass(classID:number){
    return this.httpclient.get( this.baseURL + `school_class/${classID}/edit`);
  }

  updateClass(classID: number, formData: any) {
    return this.httpclient.put(this.baseURL + `school_class/${classID}/edit`, formData);
  }

  destroyClass(classID:number){
    return this.httpclient.delete(this.baseURL + `school_class/${classID}/delete`);
  }
}
