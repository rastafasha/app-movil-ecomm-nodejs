import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from '../../../services/payment.service';


@Component({
  selector: 'app-wallet-edit',
  templateUrl: './wallet-edit.component.html',
  styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent implements OnInit {

  public tipopagoForm: FormGroup;
  public usuario: Usuario;
  public paym: Payment;
  public payment_data : any = {};
  public formSumitted = false;
  error: string;
  pageTitle: string;

  public paymentSeleccionado: Payment;

  constructor(
    private http: HttpClient,
    private location: Location,
    private paymentService : PaymentService,
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
    this.activatedRoute.params.subscribe( ({id}) => this.cargarPagos(id));

    window.scrollTo(0,0);

  }

  cargarPagos(id: string){

    if (!id !== null && id !== undefined) {
      this.pageTitle = 'Editing Payment';
      this.paymentService.get_payment(id).subscribe(
        res => {
          this.tipopagoForm.patchValue({
            id: res._id,
            nombreCompleto: res.nombreCompleto,
            username: res.username,
            phone: res.phone,
            email: res.email,
            type: res.type,
            bankName: res.bankName,
            accountNumber: res.accountNumber,
            user: this.usuario.uid,
          });
          this.paym = res;
          console.log(this.paym);
        }
      );
    } else {
      this.pageTitle = 'Creating Payment';
    }

    this.validarFormulario();

  }


  validarFormulario(){
    this.tipopagoForm = this.fb.group({
      nombreCompleto: [ '', Validators.required ],
      username: [ '', Validators.required ],
      phone: [ '', Validators.required ],
      email: [ '', Validators.required ],
      type: [ '', Validators.required ],
      bankName: [ '' ],
      accountNumber: [ '', ],
      user: [ this.usuario.uid, Validators.required ],
    });
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



  pagoFill(){
    const {nombreCompleto, username ,phone, type,
      email,bankName, accountNumber,  user
    } = this.tipopagoForm.value;

    if(this.paym){
      //actualizar
      const data = {
        ...this.tipopagoForm.value,
        _id: this.paym._id
      }
      this.paymentService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${type} ${bankName}  actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/app/wallet`)
        });

    }else{
      //crear
      this.paymentService.registro(this.tipopagoForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${type} creado correctamente`, 'success');
        this.router.navigateByUrl(`/app/wallet`)
      })
    }
  }



}
