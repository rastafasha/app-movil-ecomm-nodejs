import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public ticket: Ticket;
  public url;

  constructor(
    private _http : HttpClient
  )
  {
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

  registro(ticket: Ticket):Observable<any>{
    console.log(ticket);
    const url = `${base_url}/tickets/`;
    return this._http.post(url, ticket, this.headers);
  }

  send(ticket: Ticket):Observable<any>{
    console.log(ticket);
    const url = `${base_url}/tickets/ticket_msm/send/`;
    return this._http.post(url, ticket, this.headers);
  }

  listar(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/tickets/'+id,{headers:headers})


  }

  listarPorVenta(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/tickets/ticket_venta/'+id,{headers:headers})

  }

  data(de:any,para:any):Observable<any>{

    const url = `${base_url}/tickets/ticket_chat/chat/`+de+'/'+para;
    return this._http.get(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, ticket: Ticket}) => resp.ticket)
      );
  }

  get_ticket(id:string):Observable<any>{

    const url = `${base_url}/tickets/${id}`;
    return this._http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, ticket: Ticket}) => resp.ticket)
        );
  }

}
