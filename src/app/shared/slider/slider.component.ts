import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public promociones: any;

  constructor(
    private promoService: PromocionService,
  ) { }

  ngOnInit(): void {
    this.loadPromos();
  }

  loadPromos(){
    this.promoService.cargarPromocionsActive().subscribe(
      resp => {
        this.promociones = resp;
        // console.log(this.promociones);
      }
    )
  }

}
