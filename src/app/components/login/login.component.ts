import {Component} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginConUsConForm: FormGroup;
  public isLogged: boolean = false;
  //private usersArray: any;
  public mensajeDatosInvalidos: boolean = false;
  public mensajeNoLogeado: boolean = false;

  
  constructor(public fb: FormBuilder, public router: Router, public autenticacionService: AutenticacionService) {
    //Formulario de Login
    this.loginConUsConForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitConUsCon() {


    if(this.loginConUsConForm.valid){
      this.mensajeDatosInvalidos = false;
      // Esto es lo mío para autenticarse con Firebase
      const usuario = this.saveUserdata();
      let userdata = {email:usuario.email, password:usuario.password};
      console.log("DEsde el Component Login Usuario vale: ", usuario);
      let resultado = this.autenticacionService.inicioSesionUsCon(userdata);
      if(resultado){
        console.log("Estoy dentro de login component y resultado vale:", resultado);
        this.isLogged = true;
        this.router.navigate(['/home']);
      }else{
        this.isLogged = false;
        this.setTrueMensajeNoLogeado();
        this.mensajeDatosInvalidos = true;
      }
    }else{
      this.mensajeDatosInvalidos = true;
    }
                    
  }

  onSubmitRegistroConGoogle(){

    
    this.autenticacionService.registroUsuarioGoogle();
    setTimeout(() =>{
      if (this.autenticacionService.usuarioAutenticado === true){
        this.isLogged = true;
        console.log("Estoy dentro de login component y this.usuarioAutenticado vale:", this.isLogged);
        this.router.navigate(['/home']);
      } 
    },3000);
      
  
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.loginConUsConForm.get('email')?.value,
      password: this.loginConUsConForm.get('password')?.value,
    };
    return saveUserdata;
  }

  setTrueMensajeNoLogeado(){
    this.mensajeNoLogeado = true;

  }

}
