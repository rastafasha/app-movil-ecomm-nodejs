import { environment } from "src/environments/environment";
import { Producto } from './producto.model';
const base_url = environment.baseUrl;

export class Categoria{
  constructor(
    public icono : string,
    public nombre: string,
    public state_banner : boolean,
    public subcategorias?: string,
      public img?: string,
    public _id?: string

  ){
  }

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/categorias/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/categorias/${this.img}`;
    }else {
      return `${base_url}/uploads/categorias/no-image.jpg`;
    }

  }


}

export class CatProducModel {



    constructor(
      public titulo: string,
        public precio_ahora: number,
        public precio_antes: number,
        public video_review: string,
        public info_short: string,
        public detalle: string,
        public stock: string,
        public categoria: string,
        public subcategoria: string,
        public nombre_selector: string,
        public marca: string,
        public img: string,
        public poster: string,
        public stars: string,
    public _id: string
    ){

    }

}
