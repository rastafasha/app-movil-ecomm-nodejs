import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto.model';
import { Observable } from "rxjs";
import { Categoria, CatProducModel } from '../models/categoria.model';


const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  serverUrl = environment.baseUrl;


  public producto: Producto;
  public categoria: CatProducModel;

  constructor(
    private http: HttpClient
  ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  getProductos() {
    const url = `${base_url}/productos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, productos: Producto[]}) => resp.productos)
      )
  }
  getProductosActivos() {
    const url = `${base_url}/productos/activos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, productos: Producto[]}) => resp.productos)
      )
  }
  getProductosActivosDestacados() {
    const url = `${base_url}/productos/destacados`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, productos: Producto[]}) => resp.productos)
      )
  }

  getProductoById(_id: string){
    const url = `${base_url}/productos/${_id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto: Producto}) => resp.producto)
      );

  }

  listar_newest():Observable<any>{
    const url = `${base_url}/productos/productos_nuevos/show_producto`;
    return this.http.get(url,  this.headers);
  }


  cat_by_name(id):Observable<any>{
    const url = `${base_url}/productos/productos_general/cat/`+id;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, productos: Producto}) => resp.productos)
      );
  }
/**
   * @method: Método que obtiene producto por categoria
   * @author: malcolmc
   * @since 21/06/2022
   * @param _id {_id}: objeto a obtener
   */

  listar_productoCat(_id: string): Observable<Producto>{
    const url = `${base_url}/productos/producto_general/general/data/cat/?categoria=${_id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto_data: Producto}) => resp.producto_data)
      );

  }

  aumentar_ventas(id):Observable<any>{
    const url = `${base_url}/productos/productos_ventas/aumentar/`+id;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto: Producto}) => resp.producto)
      );

  }

  reducir_stock(id,cantidad):Observable<any>{
    const url = `${base_url}/productos_stock/reducir/`+id+'/'+cantidad;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto: Producto}) => resp.producto)
      );

  }









}
