import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Auth } from '@angular/fire/auth';



import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { getApp, FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {


  usuarioAutenticado:boolean = false;
  usuarioARegistrarse: boolean = false;
  
  NombreUsuario: string = "";
  userCredential!: UserCredential;
  usuario!: any;  

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAvS_MPjtENdVGtIuPS9_zJBOKAqJ2Tg08',
      authDomain: 'employees-b25bb.firebaseapp.com',
      projectId: 'employees-b25bb',
      storageBucket: 'employees-b25bb.appspot.com',
      messagingSenderId: '1013529996138',
      appId: "1:1013529996138:web:44e8346ab38759f760d313"
    };

    // Initialize Firebase
  


    

    const app = initializeApp(firebaseConfig);
        
  }


  registroUsuarioUsCon(userdata:{email:string, password: string}) {
    console.log("El usuario-email es: ", userdata.email);
    console.log("El usuario-password es: ", userdata.password);
    
    console.log("El userdata es: ", userdata);
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
      .then((userCredential) => {
        this.usuarioAutenticado = true;
        // Signed in
        
        const user = userCredential.user.email;
        this.usuario = user;
        console.log("El usuario es: ", user);
        // ...
      })
      .catch((error) => {
        this.usuarioAutenticado = false;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }


  registroUsuarioGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        this.usuarioAutenticado = true;
        // Signed in 
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
          this.usuarioAutenticado = true;

          console.log("El usuarioAutenticado vale:", this.usuarioAutenticado);
          console.log("El credentialFromResult(result) vale:", credential);

          const usuario = result.user.email;
          console.log("Este es el usuario: ", usuario);
          this.usuario = usuario;

        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..

        console.log(errorCode, errorMessage);


      });
  }

  // Esto inicia sesión con Google
  inicioSesionGoogle() {
  //inicioSesionGoogle(userdata: { email: any; password: any; }) {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //this.credencialesUsuario = credential?.toJSON;
        const token = credential?.accessToken;
        
        console.log("Este es el token: ", token);
        //console.log("Este es el credential: ", this.credencialesUsuario);
        
        if(credential){
          this.usuarioAutenticado = true;
          console.log("El usuarioAutenticado vale:", this.usuarioAutenticado);

          const usuario = result.user.email;
          console.log("Este es el usuario: ", usuario);
          this.usuario = usuario;
        }
        
        //const usuario = getAdditionalUserInfo(result);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {

        this.usuarioAutenticado = false;
        console.log("El usuarioAutenticado vale:", this.usuarioAutenticado)        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  // ESto inicia sesión con una cuenta email y contraseña
  inicioSesionUsCon(userdata: { email: string, password: string }): boolean {
    var resultado: boolean = false;
    const auth = getAuth();
     signInWithEmailAndPassword(auth, userdata.email, userdata.password)
     .then((result) => {
      resultado = true;
      console.log("El resultado nada más entrar en el then es: ", resultado);
      this.usuarioAutenticado = true;

      const user = auth.currentUser;
      console.log("El user es: ", user);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //this.credencialesUsuario = credential?.toJSON;
      const token = credential?.accessToken;
      
      console.log("Este es el token: ", token);
      //console.log("Este es el credential: ", this.credencialesUsuario);
      
      /* if(credential){
        this.usuarioAutenticado = true;
        console.log("El usuarioAutenticado vale:", this.usuarioAutenticado);

        const usuario = result.user.email;
        console.log("Este es el usuario: ", usuario);
        this.usuario = usuario;
      } */
      
      //const usuario = getAdditionalUserInfo(result);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      resultado = false;
      this.usuarioAutenticado = false;
      console.log("El usuarioAutenticado vale:", this.usuarioAutenticado)        
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Los errores son estos errorcode y errorMessage",errorCode, errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
    console.log("resultado  antes de salir del servicio vale:", resultado);
    this.usuarioAutenticado = true;
    return true;


    /*  .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log("Esto en el servicio crdential vale: ",credential);
        if(credential != null){
          this.usuarioAutenticado = true;
          const usuarioMail = result.user.email;
          
          console.log("Dentro del if del service Este es el mail del usuario: ", usuarioMail);
          
          console.log("Dentro del if del service El result vale:", result);
          console.log("Dentro del if del service El usuarioAutenticado vale:", this.usuarioAutenticado);

          resultado = true;
        }        
               
      })
      .catch(
        error => {
          this.usuarioAutenticado = false;
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          console.log('Desde el servicio error de Login el error es: ',errorCode, errorMessage);
          console.log(errorCode, errorMessage);
          resultado = false;
          
        }
        
      );
      console.log('resultado vale', resultado);
      return resultado; */
      
      
  }

  isAuthenticated() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      console.log('Dentro del servicio y autenticado');
      return true;
    } else {
      console.log('Dentro del servicio pero no autenticado');
      return false;
    }
  }

  logout() {
    const auth = getAuth();
    auth.signOut();
    this.usuarioAutenticado = false;
    
  }

  public setAutenticado(autenticado:boolean){
    this.usuarioAutenticado = autenticado;
    console.log("autenticado del servicio:",this.usuarioAutenticado);
  }


}