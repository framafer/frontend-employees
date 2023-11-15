import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

import { EmployeeFirebaseComponent } from './components/employee-firebase/employee-firebase.component';
import { AutenticationGuard } from './autentication.guard';
//import {HomeComponent} from "./Componentes/home/home.component";
//import {LoginComponent} from "./Componentes/login/login.component";
//import {RegistrationComponent} from "./Componentes/registration/registration.component";
//import {CalendarComponent} from "./Componentes/Mare/calendar/calendar.component";
//import {SpiaggiaBookingComponent} from "./Componentes/Mare/spiaggia-booking/spiaggia-booking.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"registro",component:RegistroComponent},
  {path:"employee",component:EmployeeFirebaseComponent, canActivate:[AutenticationGuard]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
