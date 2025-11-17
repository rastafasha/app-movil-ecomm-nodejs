import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalPromoComponent } from './modal-promo/modal-promo.component';
import { SharedModule } from '../shared/shared.module';
// import { IncrementadorComponent } from './incrementador/incrementador.component';



@NgModule({
  declarations: [
    ModalImagenComponent,
    ModalPromoComponent,
    // IncrementadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule

  ],
  exports:[
    ModalImagenComponent,
     ModalPromoComponent,
    // IncrementadorComponent
  ]
})
export class ComponentsModule { }
