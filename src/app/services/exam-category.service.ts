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
    return this.httpclient.post( this.baseURL + 'examCategories', ExamData);
  }
  
  getExamCategories(){
    return this.httpclient.get( this.baseURL + 'examCategories');    
  }

  getPgExamCategories(page: number|string, pageSize: number|string) {
    
    return this.httpclient.get(`${this.baseURL}examCategories?page=${page}&pageSize=${pageSize}`);
  } 
  getExamCategory(titleID:number){
    return this.httpclient.get( this.baseURL + `examCategories/${titleID}/edit`);
  }

  updateExamCategory(titleID: number, formData: any) {
    return this.httpclient.post(this.baseURL + `examCategories/${titleID}/edit`, formData);
  }

  destroyExamCategory(titleID:number){
    return this.httpclient.delete(this.baseURL + `examCategories/${titleID}/delete`);
  }
}
