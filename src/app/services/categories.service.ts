import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CategoriesResponse{
  id:number,
  title:string,
  created_at:Date,
  updated_at:Date,
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpclient:HttpClient) { }

  getCategories(){
    return this.httpclient.get('http://127.0.0.1:8000/api/categories');
  }

  saveCategories(categoryData:any){
    return this.httpclient.post('http://127.0.0.1:8000/api/categories', categoryData);
  }
}
