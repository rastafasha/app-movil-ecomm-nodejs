import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/models/ventas.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import {environment} from 'src/environments/environment';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-pedido-status',
  templateUrl: './pedido-status.component.html',
  styleUrls: ['./pedido-status.component.css']
})
export class PedidoStatusComponent implements OnInit {

  public usuario;
  public url;
  public msm_error = false;
  public msm_success = false;
  public venta: Venta;
  public ordenes: Venta;
  public ventas: Venta;
  public id;
  public detalle : any = {};
  public msm_error_review='';
  public data_comentarios : Array<any> = [];
  public btn_cancelar;

  public cancelacion : any = {};
  public msm_error_cancelar = '';
  public data_cancelacion : any = {};

  constructor(
    private http: HttpClient,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private ventaService: VentaService,
    private usuarioService: UsuarioService,
    private router : Router,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {

    if(this.usuario){
      this.listar_ordenes();
      this.url = environment.baseUrl;
    }else{
      this.router.navigate(['/']);
    }
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPedido(id));
  }

  listar_ordenes(){
    this.url = environment.baseUrl;
        this.activatedRoute.params.subscribe(
          params=>{
            this.id = params['id'];
          }
        );
        this.ventaService.detalle(this.id).subscribe(
          response =>{
            this.detalle = response.detalle;
            this.venta = response.venta;
            console.log(this.detalle);

          },
          error=>{
          }
        );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getPedido(id:string){
    if(!id !== null && id !== undefined){
      this.ventaService.getVenta(id).subscribe(
        response=>{
          this.venta = response.venta;
          console.log(this.venta);
        },
        error=>{

        }
      );
    }

  }

  get_cancelacion(){

    this.ventaService.get_cancelacion_venta(this.venta._id).subscribe(
      response =>{
        this.data_cancelacion = response.cancelacion;


      },
      error =>{
        this.data_cancelacion = null;

      }
    );
  }

  finalizar(id:string){
    this.ventaService.finalizar(this.venta._id).subscribe(
      response =>{
        this.ventaService.detalle(this.venta._id).subscribe(
          response =>{
            this.detalle = response.detalle;
            this.venta = response.venta;
            $('#finalizar').modal('hide');
            $('.modal-backdrop').removeClass('show');

          },
          error=>{

          }
        );
      },
      error=>{

      }
    );
  }

  cancelar(cancelarForm){
    if(cancelarForm.valid){
      this.msm_error_cancelar = '';
      this.cancelacion.mensaje = cancelarForm.value.mensaje;

      this.ventaService.cancelar(this.cancelacion).subscribe(
        response =>{
          $('#sol_cancelar').modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.get_cancelacion();
        },
        error=>{
          console.log(error);

        }
      );
    }else{
      this.msm_error_cancelar = 'Escribe el motivo de la cancelación.'
    }
  }

  close_alert(){
    this.msm_error_review = '';
    this.msm_error_cancelar = '';
  }


}
