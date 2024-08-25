import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modules
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';

import { AccountSettingComponent } from './account-setting/account-setting.component';
import { InicioComponent } from './inicio/inicio.component';
import { HomeComponent } from './home/home.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CategoryComponent } from './category/category.component';

import { ProductComponent } from './product/product.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PickupStoreComponent } from './pickup-store/pickup-store.component';
// import { SearchComponent } from './search/search.component';
// import { SettingsComponent } from './settings/settings.component';
// import { SinglepageComponent } from './singlepage/singlepage.component';

//usuario
import { PedidoStatusComponent } from './usuario/pedido-status/pedido-status.component';
import { ProfileComponent } from './usuario/profile/profile.component';
import { ProfileEditComponent } from './usuario/profile-edit/profile-edit.component';
import { PedidosComponent } from './usuario/pedidos/pedidos.component';
import { DireccionesComponent } from './usuario/direcciones/direcciones.component';
import { CuponesComponent } from './usuario/cupones/cupones.component';
import { FavoritesComponent } from './usuario/favorites/favorites.component';

//wallet
import { WalletComponent } from './wallet/wallet.component';
import { WalletOrderComponent } from './wallet/wallet-order/wallet-order.component';
import { WalletPaymentComponent } from './wallet/wallet-payment/wallet-payment.component';
import { WalletEditComponent } from './wallet/wallet-edit/wallet-edit.component';
import { DireccionEditComponent } from './usuario/direcciones/direccion-edit/direccion-edit.component';

import { NgxPayPalModule } from 'ngx-paypal';
import { TicketIndexComponent } from './usuario/ticket-index/ticket-index.component';
import { TicketChatComponent } from './usuario/ticket-chat/ticket-chat.component';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [
    AccountSettingComponent,
    BusquedaComponent,
    InicioComponent,
    HomeComponent,
    PagesComponent,
    ProfileComponent,
    ProfileEditComponent,
    CategoryComponent,
    FavoritesComponent,
    StoreComponent,
    CartComponent,
    ShippingComponent,
    PickupStoreComponent,
    ProductComponent,
    PedidosComponent,
    PedidoStatusComponent,
    CuponesComponent,
    WalletComponent,
    WalletOrderComponent,
    WalletPaymentComponent,
    WalletEditComponent,
    DireccionesComponent,
    DireccionEditComponent,
    TicketIndexComponent,
    TicketChatComponent
    // SearchComponent,
    // SettingsComponent,
    // SinglepageComponent,
  ],
  exports: [
    PagesComponent,
    AccountSettingComponent,
    InicioComponent,
    HomeComponent,
    PagesComponent,
    ProfileComponent,
    ProfileEditComponent,
    CategoryComponent,
    FavoritesComponent,
    StoreComponent,
    CartComponent,
    ProductComponent,
    PickupStoreComponent,
    ShippingComponent,
    PedidosComponent,
    PedidoStatusComponent,
    CuponesComponent,
    WalletComponent,
    WalletOrderComponent,
    WalletPaymentComponent,
    WalletEditComponent,
    DireccionesComponent,
    DireccionEditComponent,
    TicketIndexComponent,
    TicketChatComponent
    // SearchComponent,
    // SettingsComponent,
    // SinglepageComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPayPalModule,
    ClipboardModule


  ]
})
export class PagesModule { }
