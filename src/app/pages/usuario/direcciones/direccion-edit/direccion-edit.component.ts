import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion.model';
import { DireccionService } from 'src/app/services/direccion.service';
import { environment } from 'src/environments/environment';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-direccion-edit',
  templateUrl: './direccion-edit.component.html',
  styleUrls: ['./direccion-edit.component.css']
})
export class DireccionEditComponent implements OnInit {

  // public direccion: Direccion;
  public direccionForm: FormGroup;
  public usuario;
  public direccion_id:any;
  public nombres_completos:any;
  public direccion:any;
  public referencia:any;
  public pais:any;
  public ciudad:any;
  public zip:any;
  public direccion_selected:any;
  pageTitle:string;
  public url;
  public paises;
  public direccion_data : any = {};
  public data_paises : any = [];

  constructor(
    private usuarioService: UsuarioService,
    private _direccionService: DireccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe((resp:any)=>{
    //   console.log(resp);
    //   this.direccion_id = resp.id;
    //   this.nombres_completos = resp.nombres_completos,
    //   this.direccion = resp.direccion,
    //   this.referencia = resp.referencia,
    //   this.pais = resp.pais,
    //   this.ciudad = resp.ciudad,
    //   this.zip = resp.zip,
    //   // id = resp.id;
    //   // this.getDirecction();
    //   // this.getDireccion();
    // });
    this.validarFormulario();
    if(this.usuario){
      this.direccion_data = {};
      this.usuario;
      this.url = environment.baseUrl;

      // this.http.get('https://restcountries.com/v2/all').subscribe(
      //   data => {

      //     this.paises = data;
      //     this.paises.forEach(element => {
      //         this.data_paises.push(element.nativeName);

      //     });

      //   }
      // );
    }
    this.activatedRoute.params.subscribe( ({id}) => this.getDireccion(id));
  }

  getDirecction(){
    this._direccionService.get_direccion(this.direccion_id).subscribe((resp:any)=>{
      console.log(resp);
      this.direccion_selected = resp;
      
    })
  }


  getDireccion(id:any){


    if(!id !== null && id !== undefined){
      this.pageTitle = 'Editing';
      this._direccionService.get_direccion(id).subscribe(
        res => {
          this.direccionForm.patchValue({
            id: this.direccion_id,
            nombres_completos: res.nombres_completos,
            direccion: res.direccion,
            referencia: res.referencia,
            pais: res.pais,
            ciudad: res.ciudad,
            zip: res.zip,
            user: this.usuario.uid,
          });
          this.direccion = res;
          console.log(this.direccion);
        }
      );

  }else{
    this.pageTitle = 'Creating ';
  }
  // this.validarFormulario();

  }

  validarFormulario(){
    this.direccionForm = this.fb.group({
      nombres_completos: ['',Validators.required],
      direccion: ['',Validators.required],
      referencia: ['',Validators.required],
      pais: [''],
      ciudad: [''],
      zip: [''],
      user: [this.usuario.uid],
    })
  }



  onSubmit(){
    const {nombres_completos, direccion,referencia, pais,
      ciudad,zip, user } = this.direccionForm.value;

    if(this.direccion){
      //actualizar
      const data = {
        ...this.direccionForm.value,
        _id: this.direccion._id
      }
      this._direccionService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${nombres_completos}  actualizado correctamente`, 'success');
          console.log(this.direccion);
        });

    }else{
      //crear
      this._direccionService.registro(this.direccionForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${nombres_completos} creado correctamente`, 'success');
        this.router.navigateByUrl(`/app/user/direcciones`);
      })
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
