import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../services/product.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { MessageService } from 'src/app/services/message.service';
import { Categoria } from 'src/app/models/categoria.model';
import { StorageService } from 'src/app/services/storage.service';
import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { FavoritoService } from 'src/app/services/favorito.service';
import { Favorite } from 'src/app/models/favorite.model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slide-productos-h',
  templateUrl: './slide-productos-h.component.html',
  styleUrls: ['./slide-productos-h.component.css']
})
export class SlideProductosHComponent implements OnInit {

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  @Input() categories: Categoria[] = [];
  @Input() index: number;

  public productos: any;
  public producto: Producto;
  public usuario: Usuario;
  public color_to_cart = '#16537e';

  public cantidad_to_cart = 1;
  public precio_to_cart;
  public selector_to_cart = ' ';
  public err_stock ='';
  public selector_error = false;

  public productoSeleccionado: Producto;

  public msm_error_review='';
  public msm_error = false;
  public msm_success = false;
  public msm_success_fav = false;
  public msm_success_dos = false;

  favoriteItem: Favorite;

  constructor(
    private productoService: ProductoService,
    private usuarioService : UsuarioService,
    private messageService: MessageService,
    private storageService: StorageService,
    private favoritoService: FavoritoService,

    private router: Router
  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.loadProducts();


  }
  loadProducts(){
    this.productoService.getProductosActivosDestacados().subscribe(
      resp => {
        this.productos = resp;
        console.log(this.productos);
      }
    )
  }


  addToCart(prod:any): void{
    this.productoSeleccionado = prod;
    this.messageService.sendMessage(this.productoSeleccionado);
    console.log('sending item to cart...', this.productoSeleccionado);
    this.msm_success = true;
    setTimeout(()=>{
      this.close_alert()
    },2500);
  }




  addToFavorites(prod:any){
    
    this.productoSeleccionado = prod;
    const data = {
      producto: this.productoSeleccionado._id,
      usuario: this.usuario.uid,
    }
    
    this.favoritoService.registro(data ).subscribe((res:any)=>{
      this.favoriteItem = res;
      // console.log(this.favoriteItem);
      console.log('sending...', this.productoSeleccionado.titulo)
      // this.notificacion();
      this.msm_success_fav = true;
      setTimeout(()=>{
        this.close_alert()
      },2500);
    });
  }

  close_alert(){
    this.msm_error = false;
    this.msm_success = false;
    this.msm_success_fav = false;
  }

  close_toast(){
    $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide');
  }

}
