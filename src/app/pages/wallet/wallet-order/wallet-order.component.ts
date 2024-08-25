import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Congeneral } from 'src/app/models/congeneral.model';
import { CongeneralService } from 'src/app/services/congeneral.service';
import {environment} from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-wallet-order',
  templateUrl: './wallet-order.component.html',
  styleUrls: ['./wallet-order.component.css']
})
export class WalletOrderComponent implements OnInit {

  public congeneral: Congeneral;
  public congeneralSeleccionado: Congeneral;

  constructor(
    private http: HttpClient,
    private location: Location,
    private congeneralService: CongeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    handler: HttpBackend,
    public sanitizer: DomSanitizer
    ) {
      this.http = new HttpClient(handler);
      this.congeneral = congeneralService.congeneral;
      const base_url = environment.baseUrl;
     }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.cargarConf(id));
  }

  cargarConf(_id: string){

    if(_id === 'nuevo'){
      return;
    }

    this.congeneralService.getCongeneralById(_id)
    .pipe(
      // delay(100)
      )
      .subscribe( congeneral =>{
      if(!congeneral){
        return this.router.navigateByUrl(`/app/`);
      }

        const { titulo,
          cr,
          telefono_uno,
          telefono_dos,
          email_uno,
          email_dos,
          direccion,
          horarios,
          iframe_mapa,
          facebook,
          instagram,
          youtube,
          twitter,
          language } = congeneral;
        this.congeneralSeleccionado = congeneral;

        // console.log(this.congeneralSeleccionado);
      });

  }

  getMapIframe(url) {
    var mapa, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    mapa   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?' + mapa);
}



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
