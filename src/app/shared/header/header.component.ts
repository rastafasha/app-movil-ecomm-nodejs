import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { Usuario } from 'src/app/models/usuario.model';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Producto } from 'src/app/models/producto.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { environment } from 'src/environments/environment';
import { WebSocketService } from 'src/app/services/web-socket.service';
import {io} from "socket.io-client";
import { ProductoService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Categoria } from 'src/app/models/categoria.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  displaylogo: boolean = false;
  year = new Date().getFullYear();
  public usuario: Usuario;

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  total= 0;
  value: string;
  id:string;
  public identity;
  public socket = io(environment.soketServer);
  public url;
  public filter;
  public productos : Array<any> = [];
  public carrito : Array<any> = [];
  public subtotal : any = 0;
  categorias: Categoria[];
  
  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private storageService: StorageService,
    private _carritoService:CarritoService,
    private _productoService : ProductoService,
    private webSocketService: WebSocketService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public categoryService: CategoryService,
    ) {
      this.identity = usuarioService.usuario;

  }
  ngDoCheck(): void {
    this.identity = this.usuarioService.usuario;
  }


  ngOnInit(): void {
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    // this.getItem();
    // this.total = this.getTotal();
    // console.log(this.identity);
    if(this.identity){
          this.socket.on('new-carrito', function (data) {
            this.subtotal = 0;
            this.show_Carrito();
    
          }.bind(this));
    
          this.url = environment.baseUrl;
          this.activatedRoute.params.subscribe(
            params=>{
              this.filter = params['filter'];
            }
          )
    
          this.show_Carrito();
    
          this._productoService.getProductos().subscribe(
            response =>{
              this.productos = response;
    
              if(this.productos.length >= 1){
                this.productos.forEach(element => {
                  this.productos.push(element.titulo);
                });
              }
    
            },
            error=>{
    
            }
          );
        }else{
          this.obtenerCategorias();
          this.url = environment.baseUrl;
          this.activatedRoute.params.subscribe(
            params=>{
              this.filter = params['filter'];
            }
          )
        }
  }


  openMenu(){

    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.add("active");

      }
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  logout(){
    this.usuarioService.logout();
  }



  getItem():void{
    this.messageService.getMessage().subscribe((product:Producto)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === product._id){
          exists = true;
          item.quantity++;
        }
      });
      if(!exists){
        const cartItem = new CartItemModel(product);
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


  openModal(){

    var modalcart = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("show");

      }
  }



  
  search_by_filter(termino: string){

    if(termino.length === 0){
      return;
    }

    this.router.navigateByUrl(`../search/${termino}`);
    // this.router.navigate(['../search/',this.filter]);
  }

  show_Carrito(){
    this._carritoService.preview_carrito(this.identity.uid).subscribe(
      response =>{
        this.carrito = response;

        this.carrito.forEach(element => {
          this.subtotal = this.subtotal + (element.precio*element.cantidad);
        });
        console.log(this.carrito);

      },
      error=>{
        console.log(error);

      }
    );
  }
  remove_producto(id){
    this._carritoService.remove_carrito(id).subscribe(
      response=>{
        this.subtotal = this.subtotal - (response.carrito.precio*response.carrito.cantidad);
        this._carritoService.preview_carrito(this.identity.uid).subscribe(
          response =>{
            this.carrito = response;
            this.socket.emit('save-carrito_dos', {new:true});


          },
          error=>{
            console.log(error);

          }
        );
      },
      error=>{

      }
    );
  }


  obtenerCategorias(){
    return this.categoryService.getCategoriesActivas().subscribe(
      resp=>{
        this.categorias = resp;
        // console.log(resp);
      }
    )
  }





}
