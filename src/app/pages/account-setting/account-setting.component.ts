import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {



  public usuario: Usuario;

  constructor(
    private settingsService: SettingsService,
    private location: Location,
    private usuarioService: UsuarioService,

  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
