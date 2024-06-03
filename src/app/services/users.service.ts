import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

export interface UserResponse {
  id: number;
  email: string;
  member_id: string;
  member_type: string;
  loginaccess: boolean;
  role:any;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpclient: HttpClient) { }

  baseURL = environment.apiUrl;

  getRoles(): Observable<any> {
    return this.httpclient.get(`${this.baseURL}roles`);
  }

  getUsersByRole(roleId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseURL}usersByRole/${roleId}`, {
      params: { role_id: roleId.toString() }
    });
  }
  getUserByType(userID: number): Observable<any> {
    return this.httpclient.get(`${this.baseURL}usersByType/${userID}`);
  }

  saveUser(userData: any): Observable<any> {
    return this.httpclient.post(`${this.baseURL}users`, userData);
  }

  getUsers(): Observable<any> {
    return this.httpclient.get(`${this.baseURL}users`);
  }

  getPaginatedUsers(page: number | string, pageSize: number | string): Observable<UserResponse[]> {
    return this.httpclient.get<UserResponse[]>(`${this.baseURL}users?page=${page}&pageSize=${pageSize}`);
  }

  getUser(userID: number): Observable<any> {
    return this.httpclient.get(`${this.baseURL}users/${userID}/edit`);
  }

  updateUser(userID: number, formData: any): Observable<any> {
    return this.httpclient.post(`${this.baseURL}users/${userID}/edit`, formData);
  }

  destroyUser(userID: number): Observable<any> {
    return this.httpclient.delete(`${this.baseURL}users/${userID}/delete`);
  }
}
