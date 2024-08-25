import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[]=[];
  public medicos: Medico[]=[];
  public hospitales: Hospital[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
     ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({termino}) => {
        this.busquedaGlobal(termino);
      }
    )
  }


  busquedaGlobal(termino: string){
    this.busquedasService.searchGlobal(termino).subscribe(
      (resp:any) => {
        this.usuarios = resp.usuarios;
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
      }
    )
  }


}
