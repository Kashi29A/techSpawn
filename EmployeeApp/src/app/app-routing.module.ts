import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  {path: "", redirectTo: "/employees", pathMatch: "full"},
  {path: "employees",
  children:[
    {path: "", component: EmployeesComponent},
    {path: "employee", component: EmployeeComponent}
  
  ]  
},
{path:'**', component: PagenotfoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
