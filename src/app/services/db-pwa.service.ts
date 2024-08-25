import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';


@Injectable({
  providedIn: 'root'
})
export class DbPwaService {

  private db: any;

  constructor() {
    this.db = new PouchDB('ecommerce-bellaCafe');//nombre de la base de datos
  }

  // guarda datos en el navegador
  addTask(dataScheme){
    console.log('No tienes conexion a internet');
    this.db.get(dataScheme._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Encontrado y Actualizado');
        delete dataScheme._id;
        doc = Object.assign(doc, dataScheme);
        this.db.put(doc);
      }).catch( ()=> {
        this.db.put(dataScheme);
        console.log('[LOCAL]: Se creó nuevo registro local');
      });
  }





}
