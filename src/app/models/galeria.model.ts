import { environment } from 'src/environments/environment';
const base_url = environment.baseUrl;

export class Galeria{
  constructor(
      public _id: string,
      public imagen: string,
      public producto: string,


  ){
  }

  get imagenUrl(){

    if(!this.imagen){
      return `${base_url}/uploads/galerias/no-image.jpg`;
    } else if(this.imagen.includes('https')){
      return this.imagen;
    } else if(this.imagen){
      return `${base_url}/uploads/galerias/${this.imagen}`;
    }else {
      return `${base_url}/uploads/galerias/no-image.jpg`;
    }

  }
}
