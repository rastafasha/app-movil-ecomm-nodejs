import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-wallet-payment',
  templateUrl: './wallet-payment.component.html',
  styleUrls: ['./wallet-payment.component.css']
})
export class WalletPaymentComponent implements OnInit {

  // directorios: Directorio;
  // error: string;
  constructor(
    private http: HttpClient,
    private location: Location,
    handler: HttpBackend) {
      this.http = new HttpClient(handler);
     }

  ngOnInit(): void {
    // this.directorioService.getDirectorios().subscribe(
    //   (data: Directorio) => this.directorios = data,
    //   error => this.error = error
    // );
    window.scrollTo(0,0);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
