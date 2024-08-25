import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { Usuario } from 'src/app/models/usuario.model';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  year = new Date().getFullYear();
  public usuario: Usuario;

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  total= 0;
  value: string;
  id:string;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private storageService: StorageService,
    ) {
    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
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







}
