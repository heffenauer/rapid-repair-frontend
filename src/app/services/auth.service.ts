import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/authenticate';
  private registerUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/register';
  private userInfoUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/user-info';
  private updateUserInfoUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/update-user'; // Add the update user info URL
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      map((response: any) => {
        if (response && response.data.token) {
          localStorage.setItem(this.tokenKey, response.data.token);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data);
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    return this.http.get(this.userInfoUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateUserInfo(data: any): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    return this.http.put(this.updateUserInfoUrl, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
