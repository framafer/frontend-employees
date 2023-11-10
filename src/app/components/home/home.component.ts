import { Component } from '@angular/core';
import {AutenticacionService} from "src/app/services/autenticacion.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public isLogged:boolean;
  constructor(public auth:AutenticacionService) {
    this.isLogged = this.auth.usuarioAutenticado;
  }

}

