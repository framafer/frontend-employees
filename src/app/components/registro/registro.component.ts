import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NavegacionComponent } from '../navegacion/navegacion.component';
import { AutenticacionService } from 'src/app/services/autenticacion.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public registroConUsConForm: FormGroup;
  public registroConGoogleForm!: FormGroup;
  public usuarioAutenticado: boolean = false;
  
  saveUserdata() {
    const saveUser = {
      id: this.registroConUsConForm.get("id")?.value,
      registerName: this.registroConUsConForm.get("registerName")?.value,
      registerUsername: this.registroConUsConForm.get("registerUsername")?.value,
      registerEmail: this.registroConUsConForm.get("registerEmail")?.value,
      registerPassword: this.registroConUsConForm.get("registerPassword")?.value,
      registerRepeatPassword: this.registroConUsConForm.get("registerRepeatPassword")?.value
    };
    return saveUser;
  } 


  constructor(public formBuilder: FormBuilder, public router: Router, public autenticacionService: AutenticacionService) {
    this.registroConUsConForm = this.formBuilder.group({
      id: [""],
      registerName: ["", [Validators.required, Validators.minLength(4)]],
      registerUsername: ["", [Validators.required, Validators.minLength(4)]],
      registerEmail: ["", [Validators.required, Validators.email]],
      registerPassword: ["", [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6)]],
      registerRepeatPassword: ["", [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6)]]
    });
    this.registroConGoogleForm = this.formBuilder.group({});

  }

  ngOnInit() {
    
  }

  onSubmitRegistroConUsCon() {
    let usuario = this.saveUserdata();
    console.log("Esto vale usuario", usuario);
    if (usuario.registerPassword == usuario.registerRepeatPassword) {
      //const usuario = this.saveUserdata();
      this.autenticacionService.registroUsuarioUsCon({email:usuario.registerEmail, password:usuario.registerPassword});
      setTimeout(() =>{
        if (this.autenticacionService.usuarioAutenticado === true){
          this.usuarioAutenticado = true;
          console.log("Estoy dentro de registro component y this.usuarioAutenticado vale:", this.usuarioAutenticado);
          
        } 
      },3000);
    } else {
      alert("El password no coincide");
    }


  }

  onSubmitRegistroConGoogle() {
    this.autenticacionService.registroUsuarioGoogle();
    setTimeout(() =>{
      if (this.autenticacionService.usuarioAutenticado === true){
        this.usuarioAutenticado = true;
        console.log("Estoy dentro de registro component y this.usuarioAutenticado vale:", this.usuarioAutenticado);
        this.router.navigate(['/home']);
      } 
    },3000);
  }

  /* saveUserdata() {
    const saveUserdata = {
      //email: this.registroConUsConForm.get('registerEmail')?.value,      //this.registroConUsConForm.get('registerEmail')?.value,
      //password: this.registroConUsConForm.get('registerPassword')?.value,
      repeatpassword: this.registroConUsConForm.get('registerRepeatPassword')?.value,

      email: this.registroConUsConForm.get('registerEmail')?.value,
      password: this.registroConUsConForm.get('registerPassword')?.value



    };
    console.log("Esto vale saveUserdata",saveUserdata);
    return saveUserdata;
  }
 */

  isAuth() {
    return this.autenticacionService.isAuthenticated();
  }
}
