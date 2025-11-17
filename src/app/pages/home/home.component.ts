import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.closeMenu();
    var logoElements = document.getElementsByClassName("logo2");
      for (var i = 0; i<logoElements.length; i++) {
        logoElements[i].classList.add("hidelogo");

      }
  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  mostrarLogo(event: any){
    console.log('escrolling')

    var scrollTop = event.target.scrollTop;
    var logohome = document.getElementsByClassName("logo-home");
    var logoElements = document.getElementsByClassName("logo2");

    if (scrollTop >= 68) {
      for (var i = 0; i < logoElements.length; i++) {
        logoElements[i].classList.remove("hidelogo");
      }
      for (var i = 0; i < logohome.length; i++) {
        logohome[i].classList.add("hidelogo");
      }
    } else {
      for (var i = 0; i < logoElements.length; i++) {
        logoElements[i].classList.add("hidelogo");
      }
      for (var i = 0; i < logohome.length; i++) {
        logohome[i].classList.remove("hidelogo");
      }
    }
  }
}
