import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { MenuFooterAdminComponent } from './menu-footer-admin/menu-footer-admin.component';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';

import { CategoryBarComponent } from './category-bar/category-bar.component';
import { SlideProductosHComponent } from './slide-productos-h/slide-productos-h.component';
import { SliderComponent } from './slider/slider.component';
import { ShippingBillComponent } from './shipping-bill/shipping-bill.component';
import { LateralComponent } from './lateral/lateral.component';
import { ProductlistShippinOrderComponent } from './productlist-shippin-order/productlist-shippin-order.component';
import { ProductOrderListComponent } from './product-order-list/product-order-list.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { SearchBarComponent } from './search-bar/search-bar.component';


import {PipesModule} from '../pipes/pipes.module';
import { PwaNotifInstallerComponent } from './pwa-notif-installer/pwa-notif-installer.component';
import { BackButtnComponent } from './backButtn/backButtn.component';
@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    MenuFooterComponent,
    MenuFooterAdminComponent,
    CategoryBarComponent,
    SlideProductosHComponent,
    SliderComponent,
    ShippingBillComponent,
    LateralComponent,
    ProductlistShippinOrderComponent,
    ProductOrderListComponent,
    // SearchBarComponent,
    // SidebarComponent,
    PwaNotifInstallerComponent,
    BackButtnComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    MenuFooterComponent,
    MenuFooterAdminComponent,
    CategoryBarComponent,
    SlideProductosHComponent,
    SliderComponent,
    ShippingBillComponent,
    LateralComponent,
    ProductlistShippinOrderComponent,
    ProductOrderListComponent,
    PwaNotifInstallerComponent,
    // SearchBarComponent,
    // SidebarComponent,
    BackButtnComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule
  ],
})
export class SharedModule { }
