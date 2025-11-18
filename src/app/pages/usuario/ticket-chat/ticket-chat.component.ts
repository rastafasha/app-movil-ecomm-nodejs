import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/services/usuario.service';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TicketService } from "src/app/services/ticket.service";
import {io} from 'socket.io-client';
import {Mensaje, Ticket} from '../../../models/ticket.model';
import { Usuario } from 'src/app/models/usuario.model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: ['./ticket-chat.component.css']
})
export class TicketChatComponent implements OnInit{

  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;

  urlSocket = environment.soketServer;
  public identity: Usuario;
  public usuario : any = {};
  public url;
  public id;
  public msm = '';
  public msm_error=false;
  public mensajes : Array<any> = [];
  public poster_admin;
  public ticket : Ticket;
  public mesaje : Mensaje;
  public socket = io(this.urlSocket);
  
  public close_ticket = false;
  public estado_ticket;

  constructor(
    private usuarioService: UsuarioService,
    private location: Location,
    private _router : Router,
    private activatedRoute :ActivatedRoute,
    private http: HttpClient,
    private _ticketService : TicketService
  ) {
    this.identity = this.usuarioService.usuario;
  }


  ngOnInit(): void {
    window.scrollTo(0,0);

    if(this.identity){
      this.url = environment.baseUrl;
      this.activatedRoute.params.subscribe(
        params=>{
          this.id = params['id'];

        }
      );

      this.socket.on('new-formmsm', function (data) {
        if(data.data){
          this._ticketService.get_ticket(this.id).subscribe(
            response =>{
              console.log(response)
              this.ticket = response.ticket;
              this.usuario = this.ticket.usuario;
              this.estado_ticket = this.ticket.estado;
            },
            error=>{

            }
          );
        }
      }.bind(this));

      this.socket.on('new-mensaje', function (data) {
        this.mensajes = [];
        this.listar_msms();

      }.bind(this));

      this.usuarioService.get_user(this.identity.uid).subscribe(
        response =>{
          this.poster_admin = response.user.perfil;
        },
        error=>{

        }
      );

      this._ticketService.get_ticket(this.id).subscribe(
        response =>{
          // console.log(response)
           this.ticket = response;
           this.estado_ticket = this.ticket.estado;
        this.usuario = this.ticket.user
        },
        error=>{

        }
      );
      this.listar_msms();

    }else{
      this._router.navigate(['/']);
    }

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  listar_msms(){
    this._ticketService.get_ticketMensajes(this.id).subscribe(
      (response:any)=>{
        this.mensajes = response;
        response.mensajes.forEach(element => {
          if(element.ticket == this.id){
            this.mensajes.push(element);
          }
        });
        this.scrollToBottom();
        console.log(this.mensajes);

      },
      error=>{
        console.log(error);

      }
    );
  }

  sendMessage(msmForm){
    if(msmForm.valid){

      if(this.close_ticket){
        //  enviar y cerrar ticket
        let data={
          de:this.identity.uid,
          para:this.usuario,
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 0,
          estado: 0
        }
        this._ticketService.send(data).subscribe(
          response =>{
            console.log(response);
            this.msm = '';
            this.socket.emit('save-mensaje', {new:true});
            this.scrollToBottom();
            this.socket.emit('save-formmsm', {data:true});
          },
          error=>{
            console.log(error);

          }
        );
      }
      else{
        let data={
          de:this.identity.uid,
          para:this.usuario,
          msm:msmForm.value.msm,
          ticket:this.id,
           status: 1,
          estado: null
        }
        this._ticketService.send(data).subscribe(
          response =>{
            console.log(response);
            this.msm = '';
            this.socket.emit('save-mensaje', {new:true});
            this.scrollToBottom();
          },
          error=>{
            console.log(error);

          }
        );
      }
    }else{
      this.msm_error =true;
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
