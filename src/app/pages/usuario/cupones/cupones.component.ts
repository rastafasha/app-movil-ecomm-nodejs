import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

import { CuponService } from 'src/app/services/cupons.service';
import { ClipboardService } from 'ngx-clipboard';
import { Cupon } from 'src/app/models/cupon.model';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html'
})
export class CuponesComponent implements OnInit {

  public cupones;
  cupon:Cupon;

  content = 'Hello, i am tiny text and copied from somewhere else :)';

  constructor(
    private http: HttpClient,
    private location: Location,
    private cuponService : CuponService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clipboardApi: ClipboardService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
     }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.listarCupon();
    this.closeMenu();
  }

  copyText(cupon) {
    this.content = cupon;
    this.clipboardApi.copyFromContent(this.content)
    // console.log(this.content);
  }

  listarCupon(){
    this.cuponService.listar().subscribe(
      response =>{
        this.cupones = response.cupones;
        // console.log(this.cupones);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

}
