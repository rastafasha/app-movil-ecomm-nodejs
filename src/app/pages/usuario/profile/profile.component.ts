import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private location: Location,
    handler: HttpBackend) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  logout(){
    this.usuarioService.logout();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }
}
