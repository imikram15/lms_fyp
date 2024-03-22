import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DesignationResponse{
  id:number,
  title:string,
  created_at:Date,
  updated_at:Date,
}


@Injectable({
  providedIn: 'root'
})
export class DesignationsService {

  constructor(private httpclient:HttpClient) { }

  getDesignation(){
    return this.httpclient.get('http://127.0.0.1:8000/api/designations');
  }

  saveDesignation(designationData:any){
    return this.httpclient.post('http://127.0.0.1:8000/api/designations', designationData);
  }
}
