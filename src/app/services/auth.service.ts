import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}login`, { email, password })
      .pipe(map((response: any) => {
        if (response.data.token) {
          console.log('token: ',response);                    
          localStorage.setItem('auth_token', response.data.token);
          localStorage.setItem('role_id', response.data.role_id);
          localStorage.setItem('member_type', response.data.member_type);
          localStorage.setItem('member_id', response.data.member_id);
        }         
        return response;
      }));
  }


  logout(): void {
    localStorage.removeItem('auth_token');    
    localStorage.removeItem('role_id');    
    localStorage.removeItem('member_type');    
    localStorage.removeItem('member_id');    
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  // private isAuthenticatedValue = false;
  // get isAuthenticated(): boolean {
  //   return this.isAuthenticatedValue;
  // }

  // login() {
  //   this.isAuthenticatedValue = true;
  // }

  // logout() {
  //   this.isAuthenticatedValue = false;
  //   localStorage.clear();
  // }
  // isAuthenticatedlocal(){
  //   return localStorage.getItem('token')
  // }
}
