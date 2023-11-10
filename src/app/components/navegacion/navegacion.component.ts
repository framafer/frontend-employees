import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AutenticacionService} from "src/app/services/autenticacion.service"

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {
  public isLogged: boolean;

  constructor(public route: ActivatedRoute,public router:Router,public autenticacionService:AutenticacionService) {

    this.isLogged = this.autenticacionService.usuarioAutenticado;
  }
  public logOut(){
    this.autenticacionService.logout();
    this.router.navigate(['/login']);
  }
}
