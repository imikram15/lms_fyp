import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


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

  baseURL = environment.apiUrl;


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
