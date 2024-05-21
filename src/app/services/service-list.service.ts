import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServiceDTOInterface } from "../models/service-dto-interface";

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {

  private url: string = 'http://localhost:8080/services';

  constructor(private http: HttpClient) { }

  public getAllServices(): Observable<ServiceDTOInterface[]> {
    return this.http.get<ServiceDTOInterface[]>(this.url + "/list");
  }

  public getService(id: number): Observable<ServiceDTOInterface> {
    return this.http.get<ServiceDTOInterface>(this.url + '/' + id);
  }

  public deleteService(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/delete/' + id);
  }

  public createService(service: ServiceDTOInterface): Observable<ServiceDTOInterface> {
    return this.http.post<ServiceDTOInterface>(this.url + '/create', service);
  }

  public updateService(id: number, service: ServiceDTOInterface): Observable<ServiceDTOInterface> {
    return this.http.put<ServiceDTOInterface>(this.url + '/update/' + id, service);
  }
}
