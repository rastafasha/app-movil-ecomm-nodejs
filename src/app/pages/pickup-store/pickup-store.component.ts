import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Pickup } from 'src/app/models/pickup.model';
import { PickupService } from 'src/app/services/pickup.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-pickup-store',
  templateUrl: './pickup-store.component.html',
  styleUrls: ['./pickup-store.component.css']
})
export class PickupStoreComponent implements OnInit {


  public pickupForm: FormGroup;
  public usuario: Usuario;
  public pick: Pickup;
  public pickups : any = {};
  public pickup_data : any = {};
  public formSumitted = false;
  error: string;

  public msm_error = false;
  public msm_success = false;

  public pickupSeleccionado: Pickup;

  constructor(
    private http: HttpClient,
    private location: Location,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private pickupService: PickupService,
    handler: HttpBackend,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {


    this.pickupForm = this.fb.group({
      nombreCompleto: [ '', Validators.required ],
      idNumber: [ '', Validators.required ],
      email: [ '', Validators.required ],
      phone: [ '', Validators.required],
      user: [ this.usuario.uid, Validators.required ],
    });
    window.scrollTo(0,0);
  }


  getDireccion(id){
    this.pickupService.get_direccion(this.usuario.uid).subscribe(
      response =>{
        this.pickup_data = response.direccion;

      },
      error=>{

      }
    );
  }





  pickupFill(){
    const {nombreCompleto, email ,phone,
      idNUmber, user
    } = this.pickupForm.value;

    if(this.pickupSeleccionado){
      //actualizar
      const data = {
        ...this.pickupForm.value,
        user: this.usuario.uid,
        _id: this.pickupSeleccionado._id
      }
      this.pickupService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${nombreCompleto} actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.pickupService.registro(this.pickupForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${nombreCompleto} creado correctamente`, 'success');
        this.router.navigateByUrl(`/app/wallet/`)
      })
    }
    console.log(this.pickupForm.value);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
