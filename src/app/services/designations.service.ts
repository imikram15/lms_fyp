import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


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

   baseURL:any = environment.apiUrl;
   
   saveDesignation(designationData:any){
     return this.httpclient.post(this.baseURL + 'designations', designationData);
    }
    
    getDesignations(){
      return this.httpclient.get(this.baseURL +'designations');
    }

    getDesignation(designationID:number){
      return this.httpclient.get( this.baseURL + `designations/${designationID}/edit`);
    }

    updateDesignation(designationID: number, formData: any) {
      return this.httpclient.put(this.baseURL + `designations/${designationID}/edit`, formData);
    }

    destroyDesignation(designationID:number){
      return this.httpclient.delete(this.baseURL + `designations/${designationID}/delete`);
    }
}
