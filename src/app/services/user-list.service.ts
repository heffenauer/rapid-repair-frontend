import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTOInterface} from "../models/user-dto-interface";
import { environment } from "../../environments/environment.prod";

@Injectable()
export class UserListService {


  private url: string = `${environment.backendUrl}/users`;


  constructor(private http: HttpClient) {

  }

  public getAllUsers(): Observable<UserDTOInterface[]> {
    return this.http.get<UserDTOInterface[]>(this.url + "/list")
  }

  public getUser(id: number): Observable<UserDTOInterface> {
    return this.http.get<UserDTOInterface>(this.url + '/user/' + id);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/deleteUser/' + id);
  }

  public createUser(user: UserDTOInterface): Observable<UserDTOInterface> {
    return this.http.post<UserDTOInterface>(this.url + '/createUser', user);
  }

  public updateUser(id: number, user: UserDTOInterface): Observable<UserDTOInterface> {
    return this.http.put<UserDTOInterface>(this.url + '/updateUser/' + id, user);
  }
}
