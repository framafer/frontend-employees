import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public getEmployeesData$: Observable<Employee[]>;
  public subjectEmpleados$!: Observable<Employee[]>;

  constructor(public employeeService: EmployeeService) {

    this.getEmployeesData$ = this.employeeService.getEmployees();
    this.subjectEmpleados$ = this.employeeService.empleados;
    this.getEmployeesData$ = this.getEmployeesData$;


  }

  ngOnInit(): void {

    this.employeeService.getEmployees();


  }

  getEmployees() {

    this.employeeService.getEmployees();

  }

  addEmployee(form: NgForm) {

    if (form.value.id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(() => {
          this.getEmployeesData$ = this.employeeService.getEmployees();
          form.reset();
        });
    } else {

      this.employeeService.createEmployee(form.value).subscribe(() => {
        this.getEmployeesData$ = this.employeeService.getEmployees();
        form.reset();
      });
    }

  }


  deleteEmployee(employee: Employee) {
    
    if (confirm('Are you sure you want to delete it ?')) {
      if (employee.id) {
        const elid: string = employee.id;
        this.employeeService.deleteEmployee(elid).subscribe(
          (res) => {
            this.getEmployeesData$ = this.employeeService.getEmployees();
          }
        );
      }
    }
  }


  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    

  }


  resetForm(form: NgForm) {
    form.reset();
  }


}
