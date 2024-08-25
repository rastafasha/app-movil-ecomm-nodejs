import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductoService } from 'src/app/services/product.service';
import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from '../../services/storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GaleriaService } from 'src/app/services/galeria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoryService } from 'src/app/services/category.service';
import { CartItemModel } from 'src/app/models/cart-item-model';
// import {io} from 'socket.io-client';
import { CarritoService } from 'src/app/services/carrito.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { Favorite } from 'src/app/models/favorite.model';
import { ColorService } from 'src/app/services/color.service';
import { SelectorMatcher } from '@angular/compiler';
import { SelectorService } from 'src/app/services/selector.service';

declare var jQuery:any;
declare var $:any;

const base_url = environment.baseUrl;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductoService],

})
export class ProductComponent implements OnInit {

  urlSocket = environment.soketServer;

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  total= 0;
  value: string;
  _id:string;
  favoriteItem: Favorite;

  userInputNumber = 0;

  public producto: Producto;
  categories: Categoria[];
  public colores : any = [];
  public selectores : any = [];

  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public productoSeleccionado: Producto;
  public img;

  public msm_error = false;
  public msm_success = false;
  public msm_success_dos = false;

  public galerias : any ;
  public galeria : Array<any> = [];
  public select_producto;
  public nombre_selector:any;
  public first_img;

  public slug;
  public cantidad_to_cart = 1;
  public precio_to_cart;
  public color_to_cart = '#16537e';
  public selector_to_cart = ' ';
  public err_stock ='';
  public selector_error = false;

  // public socket = io(this.urlSocket);
  // public socket = io('http://localhost:4201');



   constructor(
     private http: HttpClient,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    public categoryService: CategoryService,
    private router: Router,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private storageService: StorageService,
    private galeriaService : GaleriaService,
    private _carritoService : CarritoService,
    public favoritoService: FavoritoService,
    public _colorService: ColorService,
    public _selectorService: SelectorService,
    handler: HttpBackend,
    private _sanitizer: DomSanitizer
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
      this.producto = productoService.producto;
     }

  ngOnInit(){

    // this.socket.on('new-stock', function (data) {
    //   this.init_data();

    // }.bind(this));

    this.activatedRoute.params.subscribe( ({id}) => this.cargarProducto(id));
    this.activatedRoute.params.subscribe( ({id}) => this.get_galeria(id));
    this.activatedRoute.params.subscribe( ({id}) => this.listConfig(id));
    window.scrollTo(0, 0);
    // this.getGallery();
    this.obtenerCategorias();
    }

    obtenerCategorias(){
      return this.categoryService.getCategories().subscribe(
        resp=>{
          this.categories = resp;
          console.log(this.categories);
        }
      )
    }

    get_color(event,color){
      this.color_to_cart = color.color;
  
  
    }


    cargarProducto(_id: string){

      this.productoService.getProductoById(_id).subscribe(
        resp=>{
          this.producto = resp;
          console.log(resp);
        }
      )

      // this.precio_to_cart = this.productoSeleccionado.precio_ahora;

      

    }

    listConfig(_id: string){
      this._colorService.colorByProduct(_id).subscribe(
        response =>{
          this.colores = response;
          this.color_to_cart = this.colores[0].color;
          console.log(response);
  
        },
        error=>{
  
        }
      );
  
      this._selectorService.selectorByProduct(_id).subscribe(
        response =>{
          this.selectores = response;
          console.log(response);
  
        },
        error=>{
  
        }
      );
      
    }
  

    add_to_cart(){
      if(this.cantidad_to_cart > this.producto.stock){
        this.err_stock = 'La cantidad no debe superar al stock';
      }
      else if(this.cantidad_to_cart <= 0){
        this.err_stock = 'La cantidad no puede ser un valor negativo';
      }
      else{
        this.err_stock = '';
        let data = {
          user: this.usuario.uid,
          producto : this.producto._id,
          cantidad : this.cantidad_to_cart,
          color : this.color_to_cart,
          selector : this.selector_to_cart,
          precio : this.precio_to_cart
        }
        if(this.selector_to_cart != " "){
          this.selector_error = false;
          this._carritoService.registro(data).subscribe(
            response =>{
              // this.socket.emit('save-carrito', {new:true});
              // $('#dark-toast').removeClass('hide');
              // $('#dark-toast').addClass('show');
              // setTimeout(function() {
              //     $("#dark-toast").fadeOut(1500);
              // },3000);
            },
            error=>{

            }
          );
        }else{
          this.selector_error = true;
        }
      }



    }

    addToCart(){

      this.messageService.sendMessage(this.producto);
      console.log('sending item to cart...')
      this.msm_success = true;
    }

    close_alert(){
      this.msm_error = false;
      this.msm_success = false;
      this.msm_success_dos = false;
    }

    addToFavorites(productoSeleccionado:any){
      // this.favoritoService.registro(this.productoSeleccionado);
      // console.log(this.producto);

      const data = {
        producto: this.productoSeleccionado._id,
        usuario: this.usuario.uid,
      }
      
      this.favoritoService.registro(data ).subscribe((res:any)=>{
        this.favoriteItem = res;
        // console.log(this.favoriteItem);
        console.log('sending...', this.productoSeleccionado.titulo)
        // this.notificacion();
        
      });
    }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  get_galeria(_id:Producto){
    this.galeria = [];
    this.select_producto = _id;


    if(_id){
      this.galeriaService.find_by_product(this.select_producto).subscribe(
        response =>{

          response.galeria.forEach((element,index) => {
            if(index == 0){
              this.first_img = element.imagen;
            }
              this.galeria.push({_id:element._id,imagen : element.imagen});
          });
          console.log(this.galeria);
        },
        error=>{


        }
      );
    }else{
      return;
    }
  }


  getVideoIframe(url) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}



getTotal():number{
  let total =  0;
  this.cartItems.forEach(item => {
    total += item.quantity * item.productPrice;
  });
  return +total.toFixed(2);
}

agregarUno(){
  const plusBtn = document.querySelector('.input__plus');
  let userInput = document.querySelector('.input__number');
  plusBtn.addEventListener('click', ()=>{
    this.userInputNumber++;
    // userInput.value = this.userInputNumber;
    console.log(this.userInputNumber);
});
}

eliminarUno(){
  const minusBtn = document.querySelector('.input__minus');
  let userInput = document.querySelector('.input__number');

  minusBtn.addEventListener('click', ()=>{
    this.userInputNumber--;
    if(this.userInputNumber <= 0){
        this.userInputNumber = 0;
    }
    // userInput.value = this.userInputNumber;
    console.log(this.userInputNumber);
});
}


}
