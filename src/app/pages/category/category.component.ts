import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { Categoria, CatProducModel } from 'src/app/models/categoria.model';
import { ProductoService } from 'src/app/services/product.service';
import { Producto } from '../../models/producto.model';
import { Favorite } from 'src/app/models/favorite.model';
import { FavoritoService } from 'src/app/services/favorito.service';
import { MessageService } from 'src/app/services/message.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  public categoria_route;
  public subcategoria_route;
  public productos: Producto;
  public categoria: Categoria;
  public categoriaProd: CatProducModel;
  public categoriaSeleccionado: Categoria;

  public cupones;
  public categorias;
  public categoriaId;
  public categoriaName;

  public usuario: any;

  public producto: Producto;
  public productoSeleccionado: Producto;
  public favoriteItem: Favorite;
  public msm_error = false;
  public msm_success = false;
  public msm_success_fav = false;



  constructor(
    private http: HttpClient,
    private location: Location,
    private categoryService: CategoryService,
    private usuarioService: UsuarioService,
    private productService: ProductoService,
    private activatedRoute: ActivatedRoute,
    public favoritoService: FavoritoService,
    private messageService: MessageService,
    private router: Router,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getCategories();
    this.activatedRoute.params.subscribe( ({id}) => this.getProductByCategory(id));
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((resp:any)=>{
      this.categorias = resp;
      this.categoriaId = resp.id;
      console.log(this.categorias);
      console.log(this.categoriaId);
      this.getCgetNameCategoryategories();
    })
  }
  getCgetNameCategoryategories(){
    this.categoryService.getCategoriaById(this.categoriaId).subscribe((resp:any)=>{
      this.categoriaName = resp;
      console.log(this.categoriaName);
    })
  }



  /**
   * @method: Método que obtiene producto por categoria
   * @author: malcolmc
   * @since 21/06/2022
   * @param respCatId {_id}: objeto a obtener
   */


  getProductByCategory(id: string){


    if(id){
      this.productService.cat_by_name(id).subscribe( (res:any) =>{
        
        // console.log(res);
        this.productos = res;
        console.log(this.productos);

        });

    }if(!id){
      return this.router.navigateByUrl(`/app`);
    }

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  addToFavoritoos(producto){
    this.productoSeleccionado = producto;
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

  


  addToCart(producto:any): void{
    this.producto = producto;
    this.messageService.sendMessage(this.producto);
    console.log('sending item to cart...', this.producto);
    this.msm_success = true;
    setTimeout(()=>{
      this.close_alert()
    },2500);
  }

  close_alert(){
    this.msm_error = false;
    this.msm_success = false;
    this.msm_success_fav = false;
  }


}
