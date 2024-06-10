import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/authenticate';
  private registerUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/register';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true }).pipe(
      map((response: any) => {
        console.log('Login response:', response);
        if (response && response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true });
  }
}
