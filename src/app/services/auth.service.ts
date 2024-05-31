import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://rapid-repair-backend-59fc436d8db1.herokuapp.com/authenticate';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      map((response: any) => {
        console.log('Login response:', response); // Log the response
        return response;
      })
    );
  }
}
