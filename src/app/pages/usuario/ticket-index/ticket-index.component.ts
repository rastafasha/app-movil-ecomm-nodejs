import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/services/usuario.service';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TicketService } from "src/app/services/ticket.service";
import { Ticket } from 'src/app/models/ticket.model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-ticket-index',
  templateUrl: './ticket-index.component.html',
  styleUrls: ['./ticket-index.component.css']
})
export class TicketIndexComponent implements OnInit {

  public usuario;

  public url;
  public id;
  public tickets : Ticket;
  public ticket : Ticket;
  public msm_error_review = '';

  public data_titulo='';

  constructor(
    private usuarioService: UsuarioService,
    private location: Location,
    private _router : Router,
    private activatedRoute :ActivatedRoute,
    private http: HttpClient,
    private _ticketService : TicketService

  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    if(this.usuario){
      this.url = environment.baseUrl;
      this.activatedRoute.params.subscribe(
        params=>{
          this.id = params['id'];
          this.listar(this.id);
        }
      );
    }else{
      this._router.navigate(['/']);
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  listar(id){
    this._ticketService.listarPorVenta(id).subscribe(
      response =>{
        this.tickets = response.tickets;
        console.log(this.tickets);

      },
      error=>{

      }
    );
  }

  createTicket(ticketForm){
    if(ticketForm.valid){
      let data = {
        tema : this.data_titulo,
        venta : this.id,
        user : this.usuario.uid,
      }
      this._ticketService.registro(this.ticket).subscribe(
        response =>{
          this.msm_error_review = '';
          this.data_titulo = '';
          this.listar(this.id);
          $('#form-modal').modal('hide');
          $('.modal-backdrop').removeClass('show');
        },
        error=>{
          console.log(error);

        }
      );

    }else{
      this.msm_error_review = 'Ingrese el tema del ticket.'
    }
  }

  close_alert(){
    this.msm_error_review = '';

  }

}
