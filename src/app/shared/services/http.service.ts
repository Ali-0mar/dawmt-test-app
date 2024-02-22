import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IResponseWithPagination} from "../interfaces/IResponseWithPagination";
import {HTTP_BASE_URL} from "../constants/HTTPContants";

@Injectable({
  providedIn: 'root',

})
export class HttpService {

  constructor(private http: HttpClient) { }

  getData<T>(endpoint: string[]): Observable<T[]> {
    const constructedEndpoint = this.constructQuery(endpoint);
    return this.http.get<T[]>(constructedEndpoint);
  }

  getPaginatedData<T>(endpoint: string[], page: number, pageSize: number): Observable<IResponseWithPagination<T>> {
    const constructedEndpoint = this.constructQuery(endpoint);
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<IResponseWithPagination<T>>(constructedEndpoint, { params });
  }

  private constructQuery(endpoint: string[]): string {
    // Join the array of endpoint strings to construct the full endpoint
    return HTTP_BASE_URL + endpoint.join('/');
  }
}
