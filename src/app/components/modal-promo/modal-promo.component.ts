import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-promo',
  templateUrl: './modal-promo.component.html',
  styleUrls: ['./modal-promo.component.css']
})
export class ModalPromoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cerrarModal(){
    // this.imgTemp = null;
    // this.modalImagenService.cerrarModal();
  }

}
