import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  baseURL = environment.apiUrl;

 

  getPaginatedEvents(page: number|string, pageSize: number|string) {
    
    return this.http.get(`${this.baseURL}events?page=${page}&pageSize=${pageSize}`);
  } 
  saveEvent(event: any): Observable<any> {
    return this.http.post(this.baseURL + 'events' , event);
  }

   getEvent(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}events/${id}`);
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.baseURL}events`);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.post(`${this.baseURL}events/${id}/edit`, event);
  }

   destroyEvent(eventID:number){
    return this.http.delete(this.baseURL + `events/${eventID}/delete`);
  }
}
