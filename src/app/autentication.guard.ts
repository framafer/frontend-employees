import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuard implements CanActivate {
  
  constructor(private router: Router, private autenticacionService: AutenticacionService){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.autenticacionService.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      } 
      
      /* this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.displayName;
      this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.email;
      this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.uid;
      this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.photoURL;
      this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.providerId;
      this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.phoneNumber;
      this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.emailVerified;
      this.autenticacionService.NombreUsuario = this.autenticacionService.usuario.metadata.creationTime; */
      
      return true;
  }
  
}
