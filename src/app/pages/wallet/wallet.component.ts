import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from '../../services/payment.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {


  public usuario: Usuario;
  public paym: Payment;
  public payments : any = {};
  public payment_data : any = {};
  public formSumitted = false;
  error: string;
  pageTitle: string;

  public paymentSeleccionado: Payment;

  constructor(
    private http: HttpClient,
    private location: Location,
    private paymentService : PaymentService,
    private usuarioService: UsuarioService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.listar();
    this.closeMenu();
  }




  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }




  listar(){
    this.paymentService.listarPaymentUsuario(this.usuario.uid).subscribe(
      response =>{
        this.payments = response.payments;
        console.log(this.payments);
      },
      error=>{

      }
    );
  }


  eliminarPago(id: string){

    this.paymentService.eliminar(id).subscribe(
      response=>{

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.listar();
      },
      error=>{

      }
    );
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }


}
