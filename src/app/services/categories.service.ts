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

  baseURL:any = 'http://127.0.0.1:8000/api/';


  getCategories(){
    return this.httpclient.get( this.baseURL + 'categories');
  }

  saveCategories(categoryData:any){
    return this.httpclient.post( this.baseURL + 'categories', categoryData);
  }

  getCategory(categoryID:number){
    return this.httpclient.get( this.baseURL + `categories/${categoryID}/edit`);
  }

  updateCategory(categoryID: number, formData: any) {
    return this.httpclient.put(this.baseURL + `categories/${categoryID}/edit`, formData);
  }

  destroyCategory(categoryID:number){
    return this.httpclient.delete(this.baseURL + `categories/${categoryID}/delete`);
  }
}
