import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { EmployeeFirebaseComponent } from './components/employee-firebase/employee-firebase.component';



import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
//import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { AutenticacionService } from './services/autenticacion.service';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

/*import { LoginComponent } from './Componentes/login/login.component';
import { RegistrationComponent } from './Componentes/registration/registration.component';
import { CalendarComponent } from './Componentes/Mare/calendar/calendar.component';
import { HomeComponent } from './Componentes/home/home.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpiaggiaBookingComponent } from './Componentes/Mare/spiaggia-booking/spiaggia-booking.component';
 
 */

    

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeFirebaseComponent,
    NavegacionComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent
    
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
    
  ],
  providers: [AutenticacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
