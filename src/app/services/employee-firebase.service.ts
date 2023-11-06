

import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable, Subject, map, pipe, tap } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFirebaseService{

  private employees: Employee[] = [];
  private _employees: BehaviorSubject<Employee[]>;

  public employeeSelected: Employee;

  

  constructor(public http: HttpClient, private firestore:Firestore) {
    this._employees = new BehaviorSubject<Employee[]>([]);
    this.employeeSelected = {
      name: '',
      office: '',
      position: '',
      salary: 0,
    }
     
  }


  getEmployees(): Observable<Employee[]> {
    const employeeRef = collection(this.firestore, 'employees');
    return collectionData(employeeRef, { idField: 'id' }) as Observable<Employee[]>;
  }

  
  
  createEmployee(employee:Employee){

    if(employee != null){
      const employeeRef = collection(this.firestore, 'employees');
      return addDoc(employeeRef, {name:employee.name, position: employee.position, office: employee.office, salary: employee.salary});
    }else{
      console.log('employee es null');
      return new Promise(() => {});
    }

  }


  deleteEmployee(employee: Employee) {
    const placeDocRef = doc(this.firestore, `employees/${employee.id}`);
    return deleteDoc(placeDocRef);
  }
  

  updateEmployee(elid: string, employeeActualizado:Employee){
    console.log('Estoy en el servicio dentro de update y employeeOld.id vale: ', elid)
    const employeeDocRef = doc(this.firestore, `employees/${elid}`);
    updateDoc(employeeDocRef, 
      { name: employeeActualizado.name,
        office: employeeActualizado.office,
        position: employeeActualizado.position,
        salary: employeeActualizado.salary,
      }
    )
    /* .then(() => {this.getEmployees().forEach((empleados) => {
      this.employees = empleados;
    })}); */
  }


  dameEmployee(elid:string) {     // Devuelve una promesa
    const placeDocRef = doc(this.firestore, `employees/${elid}`);
    return getDoc(placeDocRef);
  }



  }

