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

    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe();
    } else {

      this.employeeService.createEmployee(form.value).subscribe(() => {
        this.getEmployeesData$ = this.employeeService.getEmployees();
        form.reset();
      });
    }

  }


  deleteEmployee(employee: Employee) {
    
    if (confirm('Are you sure you want to delete it ?')) {
      if (employee._id) {
        const elid: string = employee._id;
        this.employeeService.deleteEmployee(elid).subscribe(
          (res) => {
            this.getEmployeesData$ = this.employeeService.getEmployees();
          }
        );
      }
    }
  }


  editEmployee(employee: Employee) {

    console.log('Estoy en el edit dentro del componente y esto vale employee._id', employee._id);
    console.log('Estoy en el edit dentro del componente y esto vale employee.name', employee.name);
    console.log('Estoy en el edit dentro del componente y esto vale this.employeeService.selectedEmployee._id antes', this.employeeService.selectedEmployee._id);
    this.employeeService.selectedEmployee = employee;
    console.log('Estoy en el edit dentro del componente y esto vale this.employeeService.selectedEmployee._id después', this.employeeService.selectedEmployee._id);

  }


  resetForm(form: NgForm) {
    form.reset();
  }


}
