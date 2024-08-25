import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  public base_url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  saveToken = (token)=>{
    return this.http.post(`${this.base_url}/notifications/save`, token)
  }


}
