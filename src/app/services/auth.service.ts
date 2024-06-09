import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDTOInterface } from '../models/user-dto-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/authenticate';
  private registerUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/register';
  private userInfoUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/users/user';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      map((response: any) => {
        console.log('Login response:', response);
        if (response && response.data.token) {
          localStorage.setItem(this.tokenKey, response.data.token);
          return response;  // Return the entire response object
        }
        throw new Error('Token not found');
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserInfo(): Observable<UserDTOInterface> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = this.getUserIdFromToken(token);  // Assuming you have a method to extract user ID from token
    return this.http.get<UserDTOInterface>(`${this.userInfoUrl}/${userId}`, { headers });
  }

  updateUserInfo(user: UserDTOInterface): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.userInfoUrl}/${user.id}`, user, { headers });
  }

  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data);
  }

  private getUserIdFromToken(token: string | null): number | null {
    if (!token) return null;
    // Assuming the token is a JWT token and user ID is stored in the payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || null;  // Adjust according to your token structure
  }
}
