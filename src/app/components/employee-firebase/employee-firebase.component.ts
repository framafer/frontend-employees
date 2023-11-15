
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map, pipe } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { EmployeeFirebaseService } from 'src/app/services/employee-firebase.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-firebase',
  templateUrl: './employee-firebase.component.html',
  styleUrls: ['./employee-firebase.component.css']
})
export class EmployeeFirebaseComponent {


  employees: Employee[] = [];

  public employeeSelected: Employee;

    

  /* public getEmployeesData$: Observable<Employee[]>;
  public subjectEmpleados$!: Observable<Employee[]>;
 */
  constructor(public employeeFirebaseService: EmployeeFirebaseService, public autenticacionService:AutenticacionService, public route: ActivatedRoute,public router:Router) {

    this.employeeSelected = {
      name: '',
      office: '',
      position: '',
      salary: 0,
    }
   
  }

  ngOnInit(): void {


    this.employeeFirebaseService.getEmployees().subscribe((employees) => {this.employees = employees});

    /* console.log('Esta es la lista: ', (this.employees));
    
    this.employeeFirebaseService.employeesService.subscribe(employees => {
      this.employees = employees; */
    };

   getEmployees() {
    this.employeeFirebaseService.getEmployees();
  }

  /* addEmployee(form: NgForm) {

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

  } */

  



  async addEmployee(form: NgForm) {
    
    if (form.value.id) {
      let employeeNew = form.value;
      console.log('El empleado Nuevo, el del formulario es: ', employeeNew);
      let employeeOld = (await this.employeeFirebaseService.dameEmployee(form.value.id)).data();
      console.log('El empleado Viejo, el del firebase es: ', employeeOld);
      this.employeeFirebaseService.updateEmployee(employeeNew.id, employeeNew);
      this.getEmployees();
      form.reset();
        
    } else {
      console.log(form.value);
      const response = await this.employeeFirebaseService.createEmployee(form.value as Employee).then(() => {
        this.getEmployees();
        form.reset();
        });

        
      };
      
    }
     
        deleteEmployee(employee:Employee) {
    
          if (confirm('Are you sure you want to delete it ?')) {
      
            if (employee.id != null) {
      
              console.log('El valor del employee._id es: ', employee.id);
              this.employeeFirebaseService.deleteEmployee(employee).then(() => {
                this.getEmployees();
      
              });   
                
      
            }
            
          }
            
        }    
           
    
  


  editEmployee(employee: Employee) {
    this.employeeSelected = employee;
    console.log('Esoy en el edit y el employee.name: ', employee.name);

  }


  resetForm(form: NgForm) {
    this.employeeSelected = {
      name: '',
      office: '',
      position: '',
      salary: 0,
    }
    //form.reset();
    this.getEmployees();
  }
  
  public logOut(){
    this.autenticacionService.logout();
    this.router.navigate(['/login']);
  }

}


