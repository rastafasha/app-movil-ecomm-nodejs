import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { Carrito } from "../models/carrito.model";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public url;

  constructor(
    private _http : HttpClient,
  ) {
    this.url = environment.baseUrl;
   }

   get token():string{
    return localStorage.getItem('token') || '';
  }
   get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  // registro(data):Observable<any>{
  //   let headers = new HttpHeaders().set('Content-Type','application/json');
  //   return this._http.post(this.url + '/carritos/',data,{headers:headers})
  // }

  registro(data:any):Observable<any>{

    const url = `${this.url}/carritos`;
    return this._http.post(url, data, this.headers);
  }

  preview_carrito(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/carritos/limit/data/'+id,{headers:headers})
  }

  remove_carrito(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + '/carritos/delete/'+id,{headers:headers})
  }
}
