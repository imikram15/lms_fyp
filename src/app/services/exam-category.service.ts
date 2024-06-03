import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExamCategoryService {

  constructor(private httpclient:HttpClient) { }

  baseURL = environment.apiUrl;
  
  SaveExamCategory(ExamData:any){
    return this.httpclient.post( this.baseURL + 'exam-category', ExamData);
  }
  
  getExamCategories(){
    return this.httpclient.get( this.baseURL + 'exam-category');    
  }

  getPgExamCategories(page: number|string, pageSize: number|string) {
    
    return this.httpclient.get(`${this.baseURL}exam-category?page=${page}&pageSize=${pageSize}`);
  } 
  getExamCategory(titleID:number){
    return this.httpclient.get( this.baseURL + `exam-category/${titleID}/edit`);
  }

  updateExamCategory(titleID: number, formData: any) {
    return this.httpclient.post(this.baseURL + `exam-category/${titleID}/edit`, formData);
  }

  destroyExamCategory(titleID:number){
    return this.httpclient.delete(this.baseURL + `exam-category/${titleID}/delete`);
  }
}
