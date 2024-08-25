import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AccountSettingComponent } from './account-setting/account-setting.component';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PickupStoreComponent } from './pickup-store/pickup-store.component';
import { PedidoStatusComponent } from './usuario/pedido-status/pedido-status.component';

//usuario
import { ProfileEditComponent } from './usuario/profile-edit/profile-edit.component';
import { ProfileComponent } from './usuario/profile/profile.component';
import { FavoritesComponent } from './usuario/favorites/favorites.component';
import { PedidosComponent } from './usuario/pedidos/pedidos.component';
import { CuponesComponent } from './usuario/cupones/cupones.component';
import { DireccionesComponent } from './usuario/direcciones/direcciones.component';

//wallet
import { WalletOrderComponent } from './wallet/wallet-order/wallet-order.component';
import { WalletPaymentComponent } from './wallet/wallet-payment/wallet-payment.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletEditComponent } from './wallet/wallet-edit/wallet-edit.component';
import { DireccionEditComponent } from './usuario/direcciones/direccion-edit/direccion-edit.component';
import { TicketIndexComponent } from './usuario/ticket-index/ticket-index.component';
import { TicketChatComponent } from './usuario/ticket-chat/ticket-chat.component';
// import { SearchComponent } from './search/search.component';
// import { SettingsComponent } from './settings/settings.component';



const childRoutes: Routes = [
  { path: '', component: HomeComponent, data:{tituloPage:'home'} },
  {path:'home', component: HomeComponent, data:{tituloPage:'Bienvenido '}},
  { path: 'buscar/:termino', component: BusquedaComponent, data:{tituloPage:'Busquedas'} },


  //tienda
  {path:'product/:id', component: ProductComponent, data:{tituloPage:'Product '}},
  {path:'category', component: CategoryComponent, data:{tituloPage:'Category '}},
  {path:'category/:id', component: CategoryComponent, data:{tituloPage:'Category '}},

  //cart
  {path:'store', component: StoreComponent, data:{tituloPage:'Store '}},
  {path:'cart', component: CartComponent, data:{tituloPage:'Cart '}},
  {path:'shipping', component: ShippingComponent, data:{tituloPage:'Shipping '}},
  {path:'pickup-store', component: PickupStoreComponent, data:{tituloPage:'Pickup Store '}},

  //usuario
  {path:'profile', component: ProfileComponent, data:{tituloPage:'Profile '}},
  {path:'user/profile/edit', component: ProfileEditComponent, data:{tituloPage:'Profile Edit '}},
  {path:'user/favorites', component: FavoritesComponent, data:{tituloPage:'Favorites '}},
  {path:'cupones', component: CuponesComponent, data:{tituloPage:'cupones '}},
  {path:'user/direcciones', component: DireccionesComponent, data:{tituloPage:'direcciones '}},
  {path:'user/direccion/edit/:id', component: DireccionEditComponent, data:{tituloPage:'Wallet Edit'}  },
  {path:'user/direccion/create', component: DireccionEditComponent, data:{tituloPage:'Wallet Edit'}  },
  {path:'user/orders', component: PedidosComponent, data:{tituloPage:'Orders '}},
  {path:'user/order/:id', component: PedidoStatusComponent, data:{tituloPage:'Order Status '}},
  {path: 'account-settings', component: AccountSettingComponent, data:{tituloPage:'Ajustes de Cuenta'} },
  {path: 'user/tickets/:id', component: TicketIndexComponent, data:{tituloPage:'Tickets'} },
  {path: 'user/ticket/chat/:id', component: TicketChatComponent, data:{tituloPage:'Ticket Chat'} },

  //wallet
  {path:'wallet', component: WalletComponent, data:{tituloPage:'Wallet '}  },
  {path:'wallet/create', component: WalletEditComponent, data:{tituloPage:'Wallet Edit'}  },
  {path:'wallet/edit/:id', component: WalletEditComponent, data:{tituloPage:'Wallet Edit'}  },
  {path:'wallet-order', component: WalletOrderComponent, data:{tituloPage:'Wallet Order'}  },
  {path:'wallet-payment', component: WalletPaymentComponent, data:{tituloPage:'Wallet Payment'}  },

  // {path:'search', component: SearchComponent, data:{tituloPage:'Search '}},
  // {path:'settings', component: SettingsComponent, data:{tituloPage:'Bienvenido '}},


  //rutas de admin
  // { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data:{tituloPage:'Mantenimiento de Usuarios '} },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
