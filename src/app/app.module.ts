import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipes/pipes.module';
import { ClipboardModule } from 'ngx-clipboard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

const config: SocketIoConfig = {url: environment.soketServer, options:{}};

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ComponentsModule,
    PipesModule,
    ClipboardModule,
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
