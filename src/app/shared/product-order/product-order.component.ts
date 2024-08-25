import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { Producto } from 'src/app/models/producto.model';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  @Input() cartItem: CartItemModel;

  cartItems=[];
  total= 0;

  public producto : Producto;
  public productos: any;


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private storageService: StorageService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
     }

  ngOnInit(): void {
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
    console.log(this.cartItems);
    console.log(this.getTotal());
    window.scrollTo(0,0);
  }


  getItem():void{
    this.messageService.getMessage().subscribe((producto:Producto)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === producto._id){
          exists = true;
          item.qty++;
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

  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.qty * item.productPrice;
    });
    return +total.toFixed(2);
  }


  addToCart(){

    this.messageService.sendMessage(this.producto);
      console.log('sending item to cart...')
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


  emptyCart():void{
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
    this.ngOnInit();
  }


}
