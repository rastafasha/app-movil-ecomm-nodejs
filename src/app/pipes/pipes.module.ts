import { NgModule } from '@angular/core';
import { ImagenPipePipe } from './imagen-pipe.pipe';



@NgModule({
  declarations: [
    ImagenPipePipe
  ],
  exports:[
    ImagenPipePipe

  ]
})
export class PipesModule { }
