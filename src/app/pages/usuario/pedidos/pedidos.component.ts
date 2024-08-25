import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import {environment} from 'src/environments/environment';
import { VentaService } from 'src/app/services/venta.service';
import {Venta, Cancelacion} from '../../../models/ventas.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public usuario;
  public url;
  public msm_error = false;
  public msm_success = false;
  public cancelacion: Cancelacion;
  public ventas: Venta;


  constructor(
    private usuarioService: UsuarioService,
    private ventaService: VentaService,
    private http: HttpClient,
    private location: Location,
    private router : Router,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {
    this.closeMenu();
    window.scrollTo(0,0);
    if(this.usuario){
      this.listar_ordenes();
      this.listar_cancelacion();
      this.url = environment.baseUrl;
    }else{
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  listar_ordenes(){
    this.ventaService.listarporUser(this.usuario.uid).subscribe(
      response=>{
        this.ventas = response.ventas;
        console.log(this.ventas);
      },
      error=>{

      }
    );
  }

  listar_cancelacion(){
    this.ventaService.listarCancelacionporUser(this.usuario.uid).subscribe(
      response=>{
        this.cancelacion = response.cancelacion;
        console.log(this.cancelacion);
      },
      error=>{

      }
    );
  }

}
