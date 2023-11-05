
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeFirebaseService } from 'src/app/services/employee-firebase.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-firebase',
  templateUrl: './employee-firebase.component.html',
  styleUrls: ['./employee-firebase.component.css']
})
export class EmployeeFirebaseComponent implements OnInit {

  public getEmployeesData$: Observable<Employee[]>;
  public subjectEmpleados$!: Observable<Employee[]>;

  constructor(public employeeFirebaseService: EmployeeFirebaseService, public employeeService: EmployeeService ) {

    this.getEmployeesData$ = this.employeeFirebaseService.getEmployees();
    this.subjectEmpleados$ = this.employeeFirebaseService.empleados;
    this.getEmployeesData$ = this.getEmployeesData$;


  }

  ngOnInit(): void {

    this.employeeFirebaseService.getEmployees();


  }

  getEmployees() {

    this.employeeFirebaseService.getEmployees();

  }

  async addEmployee(form: NgForm) {

    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(() => {
          this.getEmployeesData$ = this.employeeService.getEmployees();
          form.reset();
        });
    } else {
      console.log(form.value);
      const response = await this.employeeFirebaseService.createEmployee(form.value);
      this.getEmployeesData$ = this.employeeFirebaseService.getEmployees();
      form.reset();
    }
      
      
  };
    

  


  async deleteEmployee(employee:Employee) {
    
    if (confirm('Are you sure you want to delete it ?')) {

      if (employee._id != null) {

        console.log('El valor del employee._id es: ', employee._id);
        this.employeeFirebaseService.deleteEmployee(employee._id).then((resolve) => {
          this.getEmployeesData$ = this.employeeFirebaseService.getEmployees();
          //console.log(response);

        }, );   
          

      }
      

      /* console.log(employee);
      const response = await this.employeeFirebaseService.deleteEmployee(employee);
        this.getEmployeesData$ = this.employeeFirebaseService.getEmployees();
        console.log(response);
      };


      if (confirm('Are you sure you want to delete it ?')) {
        if (employee._id) {
          const elid: string = employee._id;
          this.employeeService.deleteEmployee(elid).subscribe(
            (res) => {
              this.getEmployeesData$ = this.employeeService.getEmployees();
            }
          );
        }
      } */



     
    }
      
  }

      
        //const elid: string = employee._id;
      /* console.log('El empleado a borrar: ', employee);
      const response = await this.employeeFirebaseService.deleteEmployee(employee).as Observable.then((response) => {
        this.getEmployeesData$ = this.employeeFirebaseService.getEmployees();
        //console.log(response); */
      
      
           
    
  


  editEmployee(employee: Employee) {

    
    this.employeeService.selectedEmployee = employee;
    

  }


  resetForm(form: NgForm) {
    form.reset();
  }


}

