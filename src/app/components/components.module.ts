import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
// import { IncrementadorComponent } from './incrementador/incrementador.component';



@NgModule({
  declarations: [
    ModalImagenComponent,
    // IncrementadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports:[
    ModalImagenComponent,
    // IncrementadorComponent
  ]
})
export class ComponentsModule { }
