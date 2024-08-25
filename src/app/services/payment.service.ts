import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Payment } from '../models/payment.model';
import { map } from 'rxjs/operators';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public payment: Payment;
  public url;

  constructor(
    private _http: HttpClient,
    private router: Router,
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



  registro(payment:Payment){

    const url = `${base_url}/payments/payment/registro`;
    return this._http.post(url, payment, this.headers);
  }

  listarPayments():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/payments/',{headers:headers})
  }

  listarPaymentUsuario(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/payments/payments/'+id,{headers:headers})

  }

  get_payment(id:string){

    const url = `${base_url}/payments/payment/data/${id}`;
    return this._http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payment: Payment}) => resp.payment)
        );
  }

  update(payment: Payment){
    const url = `${base_url}/payments/payment/update/${payment._id}`;
    return this._http.put(url, payment, this.headers);
  }

  eliminar(id:string){
    const url = `${base_url}/payments/payment/remove/${id}`;
    return this._http.delete(url, this.headers);
  }


}
