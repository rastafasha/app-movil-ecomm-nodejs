import { environment } from 'src/environments/environment';
import { Categoria } from './categoria.model';
import { Color } from './color.model';
import { Selector } from './selector.model';

const base_url = environment.baseUrl;
export class Producto {
  titulo: string;
  precio_ahora: number;
  precio_antes: string;
  video_review: string;
  info_short: string;
  detalle: string;
  stock: number;
  stars:number;
  categoria: Categoria;
  color: Color;
  selector: Selector;
  subcategoria: string;
  nombre_selector: string;
  isFeatured: boolean;
  status: boolean;
  marca: string;
  createdAt: Date;
  updatedAt: Date;
  img: string;
  _id: string;

  constructor(id: string | undefined, name: string, description: string, category: any, price: number ){
    this._id = id;
    this.titulo = name;
    this.detalle = description;
    this.categoria = category;
    this.precio_ahora = price;
    // this.img = imageUrl;
  }


  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/productos/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/productos/${this.img}`;
    }else {
      return `${base_url}/uploads/productos/no-image.jpg`;
    }

  }
}
