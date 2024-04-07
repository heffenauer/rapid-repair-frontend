import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable()
export class ServicemanService {

  constructor(private http: HttpClient) {
  }


  // @ts-ignore
  public getSericeman(): Observable<ServicemanServiceDTO> {
    // @ts-ignore
    return this.http.get(ServicemanServiceDTO)(this.url)

  }

  public getAllServiceman(): Observable<any[]> {
    return of([
      {serviceManName: 'Tom', age: 28},
      {serviceManName: 'Tim', age: 22}
    ])
  }


}
