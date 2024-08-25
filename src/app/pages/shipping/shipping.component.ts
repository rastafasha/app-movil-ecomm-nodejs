import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { PostalService } from 'src/app/services/postal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Shipping } from 'src/app/models/shipping.model';
import { ShippingService } from '../../services/shipping.service';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  public postales;
  public shippingForm: FormGroup;
  public usuario: Usuario;
  public shipp: Shipping;
  public shippings : any = {};
  public shipping_data : any = {};
  public formSumitted = false;
  error: string;

  public sippingSeleccionado: Shipping;

  constructor(
    private http: HttpClient,
    private location: Location,
    private postalService : PostalService,
    private shippinglService : ShippingService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {
    this.listar();
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.cargarDireccion(id));

    this.shippingForm = this.fb.group({
      nombre: [ '', Validators.required ],
      apellido: [ '', Validators.required ],
      idnumber: [ '', Validators.required ],
      phone: [ '', Validators.required ],
      email: [ '', Validators.required ],
      direccion: [ '', Validators.required ],
      referencia: [ '', Validators.required ],
      postal: [ '', Validators.required],
      pagoTd: [ '', Validators.required ],
      pagoEfectivo: [ '', Validators.required ],
      factura: [ '', Validators.required ],
      user: [ this.usuario.uid, Validators.required ],
    });
  }

  listar(){
    this.postalService.listar().subscribe(
      response =>{
        this.postales = response.postales;
        // console.log(this.postales);

      },
      error=>{

      }
    );
  }

  cargarDireccion(_id: string){

    if(_id === 'nuevo'){
      return;
    }

    this.shippinglService.get_direccion(_id)
    .pipe(
      // delay(100)
      )
      .subscribe( shipp =>{
      if(!shipp){
        return this.router.navigateByUrl(`/app/pickup-store`);
      }

        const { nombre, apellido ,idnumber,
          phone,email,direccion, referencia, postal,
          pagoTd,pagoEfectivo, factura, user
         } = shipp;
        this.sippingSeleccionado = shipp;
        this.shippingForm.setValue({
          nombre, apellido ,idnumber,
          phone,email,direccion, referencia, postal,
          pagoTd,pagoEfectivo, factura, user
        });

      });

  }

  pickupFill(){
    const {nombre, apellido ,idnumber,
      phone,email,direccion, referencia, postal,
      pagoTd,pagoEfectivo, factura, user
    } = this.shippingForm.value;

    if(this.sippingSeleccionado){
      //actualizar
      const data = {
        ...this.shippingForm.value,
        user: this.usuario.uid,
        _id: this.sippingSeleccionado._id
      }
      this.shippinglService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${nombre} ${apellido} actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.shippinglService.registro(this.shippingForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/marca/${resp.marca._id}`)
      })
    }
    console.log(this.shippingForm.value);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
