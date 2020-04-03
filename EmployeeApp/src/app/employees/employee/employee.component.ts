import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/services/employee.service';
import { Employee } from 'app/model/employee';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = new Array();
  constructor(public service: EmployeeService, public dialogRef: MatDialogRef<EmployeeComponent>, private router: Router) { }

  ngOnInit(): void {
  }

  resetForm(){
    let empId = this.service.form.get('empId').value;
    this.service.form.reset();
   // this.service.initializeFormGroup()
    this.service.form.patchValue({empId})
  }
  submitForm(){
   console.log(this.service.form.value);
   if(this.service.form.get('_id') == null || this.service.form.get('_id') == undefined || !this.service.form.get('_id').value){
    this.service.addEmployee(this.service.form.value).subscribe(data=>{
      console.log(data)
      if(data){
        this.router.navigate(['/employees']);
        this.service.getEmployees();
      }
    })
   }
   else{
     
     this.service.updateEmployee(this.service.form.value).subscribe(data=>{
      console.log(data)
      if(data){
        this.service.getEmployees();
      }
    })
   }
  
  }

  onClose(){
    //this.service.form.reset();
    //this.service.initializeFormGroup();
    this.dialogRef.close()
    if(this.service.form.controls['_id'].value){
      console.log("navigated")
      this.router.navigate(['/employees'])
    }
  }
  onHome(){
    this.router.navigate(['/employees'])
  }

}
