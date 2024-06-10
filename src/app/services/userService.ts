
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profileUrl = `${environment.backendUrl}/profile`

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.profileUrl);
  }
}
