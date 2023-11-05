

import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable, Subject, map, pipe, tap } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFirebaseService{

  URL_API = 'http://localhost:4000/api/employees';
  public selectedEmployee: Employee = { _id: '', name: '', office:'', position:'', salary:0}
  
  
  public empleados!: BehaviorSubject<Employee[]>

  

  constructor(public http: HttpClient, private firestore:Firestore) { 

    this.getEmployees();
    
  }

  getEmployees(): Observable<Employee[]>{
    // Esto era con el servodor y mongodb:
    /* this.empleados = this.http.get<Employee[]>(this.URL_API) as BehaviorSubject<Employee[]>;
    return this.http.get<Employee[]>(this.URL_API);
 */
    // Esto es con Firebase:

    const employeeRef = collection(this.firestore, 'employees');
    this.empleados = collectionData(employeeRef, {idField:'id'}) as Observable<Employee[]> as BehaviorSubject<Employee[]>;
    console.log(this.empleados);
    return collectionData(employeeRef, {idField:'id'}) as Observable<Employee[]>;

  }

  createEmployee(employee:Employee){
    // return this.http.post(this.URL_API, employee);  ESto era sin el firebase

    // Con el firebase:
    const employeeRef = collection(this.firestore, 'employees');
    return addDoc(employeeRef, {name:employee.name, position: employee.position, office: employee.office, salary: employee.salary});
  }


  get empleadosSubject(): Observable<Employee[]>{
    return this.empleados.asObservable();
  }

  /* set empleadosSubject(newLista.asObservable():Observable<Employee[]>){
    this.empleados.next(newLista.asObservable());
  } */

  async deleteEmployee(id:string){
    // Esto era con el servidor y mongodb:
    //return this.http.delete(`${this.URL_API}/${_id}`);

    // Con el firebase:

    const employeeDocRef = doc(this.firestore, `employees/${id}`);
    /* console.log(employeeDocRef);
    lapromesa:Promise = await deleteDoc(employeeDocRef); */

    return await deleteDoc(employeeDocRef);
  }

  putEmployee(employee:Employee){
    return this.http.put(`${this.URL_API}/${employee._id}`, employee);    
  }

  }






