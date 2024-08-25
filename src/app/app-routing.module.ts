import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [

  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
