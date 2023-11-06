import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable, Subject, map, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  URL_API = 'http://localhost:4000/api/employees';
  public selectedEmployee: Employee = { name: '', office:'', position:'', salary:0}
  
  
  public empleados!: BehaviorSubject<Employee[]>

  

  constructor(public http: HttpClient ) { 

    this.getEmployees();
    
  }

  getEmployees(): Observable<Employee[]>{
    this.empleados = this.http.get<Employee[]>(this.URL_API) as BehaviorSubject<Employee[]>;
    return this.http.get<Employee[]>(this.URL_API);
  }

  createEmployee(employee:Employee){
    return this.http.post(this.URL_API, employee);
  }


  get empleadosSubject(): Observable<Employee[]>{
    return this.empleados.asObservable();
  }

  /* set empleadosSubject(newLista.asObservable():Observable<Employee[]>){
    this.empleados.next(newLista.asObservable());
  } */

  deleteEmployee(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  putEmployee(employee:Employee){
    return this.http.put(`${this.URL_API}/${employee.id}`, employee);    
  }

  }





