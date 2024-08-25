import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion.model';
import { DireccionService } from 'src/app/services/direccion.service';
import { environment } from 'src/environments/environment';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html'
})
export class DireccionesComponent implements OnInit {


  public usuario;
  public url;
  public paises;
  public data_paises : any = [];
  public direccion: Direccion;
  public msm_error = false;
  public msm_success = false;
  public direcciones : Direccion[];
  public direccion_data : any = {};
  public msm_success_dos = false;

  public direccionForm: FormGroup;
  pageTitle:string;

  constructor(
    private usuarioService: UsuarioService,
    private _direccionService: DireccionService,
    private _router : Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    if(this.usuario){
      this.direccion_data = {};
      this.usuario;
      this.url = environment.baseUrl;

      this.http.get('https://restcountries.com/v2/all').subscribe(
        data => {

          this.paises = data;
          this.paises.forEach(element => {
              this.data_paises.push(element.nativeName);

          });

        }
      );
      this.listar();
    }else{
      this._router.navigate(['/']);
    }

  }

  listar(){
    this._direccionService.listarUsuario(this.usuario.uid).subscribe(
      response =>{
        this.direcciones = response.direcciones;
        console.log(this.direcciones);
      },
      error=>{

      }
    );
  }



  close_alert(){
    this.msm_error = false;
    this.msm_success = false;
    this.msm_success_dos = false;
  }




  eliminar(id){
    this._direccionService.eliminar(id).subscribe(
      response=>{

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.listar();
      },
      error=>{

      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
