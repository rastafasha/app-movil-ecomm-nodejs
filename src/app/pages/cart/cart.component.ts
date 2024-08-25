import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import {CartItemModel} from '../../models/cart-item-model';
import { Producto } from 'src/app/models/producto.model';

import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

import { CuponService } from "src/app/services/cupons.service";
import { PostalService } from "src/app/services/postal.service";
import { DireccionService } from "src/app/services/direccion.service";
import { VentaService } from "src/app/services/venta.service";
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/product.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from '../../../environments/environment';


declare var jQuery:any;
declare var $:any;
declare var paypal;
import { WebSocketService } from 'src/app/services/web-socket.service';
// import * as io from "socket.io-client";
import {io} from 'socket.io-client';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() cartItem: CartItemModel;

  public producto : Producto;

  public carrito : Array<any> = [];
  public direcciones:any =[];
  public identity;
  public cupon;
  public msm_error_cupon=false;
  public msm_success_cupon=false;
  public subtotal = 0;
  public payPalConfig ? : IPayPalConfig;
  public data_keyup = 0;
  public postales;
  public precio_envio;
  public data_save_carrito;
  public msm_error = '';
  public productos : any = {};

  public socket = io(environment.soketServer);
  
  cartItems: any[] = [];
  total= 0;
  value: string;
  _id:string;
  public url;

  //DATA
  public radio_postal;
  public medio_postal : any = {};
  public data_cupon;
  public id_direccion = '';
  public data_direccion : any = {};
  public data_detalle : Array<any> = [];
  public data_venta : any = {};
  public info_cupon_string = '';
  public error_stock = false;
  public date_string;

  

  constructor(
    public router: Router,
    public http: HttpClient,
    private location: Location,
    private messageService: MessageService,
    private storageService: StorageService,
    private _userService: UsuarioService,
    private _productoService : ProductoService,
    private _carritoService:CarritoService,
    private _cuponService :CuponService,
    private _postalService :PostalService,
    private _direccionService :DireccionService,
    private _ventaService :VentaService,
    private webSocketService: WebSocketService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      this.identity = this._userService.usuario;
      this.url = environment.baseUrl;
     }

  ngOnInit(): void {
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
    console.log(this.getTotal());
    window.scrollTo(0,0);
    this.closeModal();

    this.listar_direcciones();
    this.listar_postal();
    this.listar_carrito();

    this.initConfig();
  }

  listar_direcciones(){
    this._direccionService.listarUsuario(this.identity.uid).subscribe(
      response =>{
        this.direcciones = response.direcciones;
        // console.log(this.direcciones);
      },
      error=>{

      }
    );
  }

  get_direccion(id_direccion:any){
    this.data_direccion = id_direccion;
    this._direccionService.get_direccion(this.data_direccion).subscribe(
      response =>{
        this.data_direccion = response;
        console.log(this.data_direccion);
      }
    );

  }

  private initConfig(){
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.clientIdPaypal,
      // clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {


          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: this.getTotal().toString(),
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: this.getTotal().toString(),
                      }
                  }
              },
              items: this.getItemsList(),
          }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove : (data, actions:any)=>{
          const order =  actions.order.capture();
          console.log(order);
          this.data_venta.idtransaccion = order.purchase_units[0].payments.captures[0].id;
          this._ventaService.registro(this.data_venta).subscribe(
            response =>{
              this.data_venta.detalles.forEach(element => {
                console.log(element);
                this._productoService.aumentar_ventas(element.producto._id).subscribe(
                  response =>{
                  },
                  error=>{
                    console.log(error);

                  }
                );
                  this._productoService.reducir_stock(element.producto._id,element.cantidad).subscribe(
                    response =>{
                      this.emptyCart();
                      this.listar_carrito();
                      // this.socket.emit('save-carrito', {new:true});
                      // this.socket.emit('save-stock', {new:true});
                      // this._router.navigate(['/cuenta/ordenes']);
                    },
                    error=>{
                      console.log(error);

                    }
                  );
              });

            },
            error=>{
              console.log(error);

            }
          );
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
            JSON.stringify(data));
            // datos del recibo de pago
            
            // this.openModal(
            //   data.purchase_units[0].items,
            //   data.purchase_units[0].amount.value,
            // );
            this.emptyCart();
            // this.spinner.hide();

        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);

        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);

        },
    };
  }

  listar_postal(){
    this._postalService.listar().subscribe(
      response =>{
        this.postales = response.postales
        this.postales.forEach((element,index) => {
          if(index == 0){
            this.radio_postal = element._id;
            this.medio_postal = {
              tipo_envio : element.titulo,
              precio: element.precio,
              tiempo: element.tiempo,
              dias : element.dias
            };
            this.precio_envio = element.precio;
          }
        });

      },
      error=>{

      }
    );
  }

  listar_carrito(){
    this._carritoService.preview_carrito(this.identity.uid).subscribe(
      response =>{
        this.carrito = response.carrito;
        this.subtotal = 0;
        this.carrito.forEach(element => {
          this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
          this.data_detalle.push({
            producto : element.producto,
            cantidad: element.cantidad,
            precio: Math.round(element.precio),
            color: element.color,
            selector : element.selector
          })


        });
        this.subtotal = Math.round(this.subtotal + parseInt(this.precio_envio));

      },
      error=>{


      }
    );
  }

  get_data_cupon(event,cupon){
    this.data_keyup = this.data_keyup + 1;

    if(cupon){
      if(cupon.length == 13){
        console.log('siii');

        this._cuponService.get_cuponCode(cupon).subscribe(
          response =>{
            this.data_cupon = response[0];
            console.log(this.data_cupon);

            this.msm_error_cupon = false;
            this.msm_success_cupon = true;

            this.carrito.forEach((element,indice) => {
                if(response.tipo == 'subcategoria'){
                  if(response.subcategoria == element.producto.subcategoria){

                    if(this.data_keyup == 0 || this.data_keyup == 1){

                      let new_subtotal = element.precio - ((element.precio*response.descuento)/100);
                      console.log(new_subtotal);
                      element.precio = new_subtotal;

                      this.subtotal = 0;
                      this.carrito.forEach(element => {
                        this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
                      });

                    }
                  }
                }
                if(response.tipo == 'categoria'){
                  if(response.categoria == element.producto.categoria){

                    if(this.data_keyup == 0 || this.data_keyup == 1){

                      let new_subtotal = element.precio - ((element.precio*response.descuento)/100);
                      console.log(new_subtotal);
                      element.precio = new_subtotal;

                      this.subtotal = 0;
                      this.carrito.forEach(element => {
                        this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
                      });

                    }

                  }
                }
            });

          },
          error=>{
            this.data_keyup = 0;
            this.msm_error_cupon = true;

            this.msm_success_cupon = false;
            this.listar_carrito();
            this.listar_postal();
          }
        );
      }else{
        console.log('nooo');

        this.data_keyup = 0;
        this.msm_error_cupon = false;
        this.msm_success_cupon = false;
        this.listar_carrito();

      }
    }else{
      this.data_keyup = 0;
        this.msm_error_cupon = false;
        this.msm_success_cupon = false;
        this.listar_carrito();

    }

  }

  select_postal(event,data){
    //RESTAR PRECIO POSTAL ANTERIOR
    this.subtotal = Math.round(this.subtotal - parseInt(this.medio_postal.precio));

    this.medio_postal = {
      tipo_envio : data.titulo,
      precio: data.precio,
      tiempo: data.tiempo,
      dias: data.dias,
    }
    this.subtotal = Math.round(this.subtotal + parseInt(this.medio_postal.precio));

  }

  verify_data(){
    if(this.id_direccion){
      this.msm_error = '';
      $('#btn-verify-data').animate().hide();
      $('#btn-back-data').animate().show();

      $('#card-data-envio').animate().show();

      $('#card-pay').animate().show('fast');
      $('.cart-data-venta').animate().hide('fast');



      if(this.data_cupon){
        if(this.data_cupon.categoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.categoria.nombre;
        }else if(this.data_cupon.subcategoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.subcategoria;
        }
      }

      var fecha = new Date();

      var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novimbre", "Deciembre"];
      fecha.setDate(fecha.getDate() + parseInt(this.medio_postal.dias));
      this.date_string =  fecha.getDate() +' de ' + months[fecha.getMonth()] + ' del ' + fecha.getFullYear();


      this.data_venta = {
        user : this.identity.uid,
        total_pagado : this.total,
        codigo_cupon : this.cupon,
        info_cupon :  this.info_cupon_string,
        idtransaccion : null,
        metodo_pago : 'Paypal',

        tipo_envio: this.medio_postal.tipo_envio,
        precio_envio: this.medio_postal.precio,
        tiempo_estimado: this.date_string,
        
        destinatario: this.identity.first_name,
        detalles:this.data_detalle,

        direccion: this.data_direccion.direccion,
        referencia: this.data_direccion.referencia,
        pais: this.data_direccion.pais,
        ciudad: this.data_direccion.ciudad,
        zip: this.data_direccion.zip,
      }

      console.log(this.data_venta);


    }else{
      this.msm_error = "Seleccione una dirección de envio.";
    }

  }

  back_data(){
    $('#btn-verify-data').animate().show();
    $('#btn-back-data').animate().hide();

    $('#card-data-envio').animate().hide();

    $('#card-pay').animate().hide('fast');
      $('.cart-data-venta').animate().show('fast');
  }

   getItem():void{
    this.messageService.getMessage().subscribe((producto:Producto)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === producto._id){
          exists = true;
          item.quantity++;
        }
      });
      if(!exists){
        const cartItem = new CartItemModel(producto);
        this.cartItems.push(cartItem);

      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);

    });
  }

  getItemsList(): any[]{

    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel)=>{
      item = {
        name: it.productName,
        unit_amount: {
          currency_code: 'USD',
          value: it.productPrice,
        },
        quantity: it.quantity,
        category: it.category,
      };
      items.push(item);
    });
    return items;
  }

  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }

  addToCart(producto){


    this.messageService.sendMessage(this.producto);
      console.log('sending item to cart...')
  }

  emptyCart():void{
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
    this.getItemsList();
    this.ngOnInit();

  }

  deletItem(i:number):void{
    if(this.cartItems[i].quantity > 1){
      this.cartItems[i].quantity--;

    }else{
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
    this.ngOnInit();
  }

  closeModal(){
    var modalcart = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.remove("show");

      }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
