import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'app/model/employee';
import { EmployeeService } from 'app/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeesList: Employee[];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['empId','fullName','email','DOB','mobile','gender','Address','actions'];
  @ViewChild(MatSort) sort: MatSort
  constructor(private employeeService : EmployeeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeeService.getEmployees().subscribe(data=>{
     this.employeesList = data
     console.log(data)
     this.listData = new MatTableDataSource(data);
     this.listData.sort = this.sort;
    })
  }
  
  deleteEmployee(employee: Employee){
    console.log(employee._id)
    if(window.confirm("Are you sure your want to delete ?")){
      this.employeeService.deleteEmployee(employee._id).subscribe(data=>{
        console.log(data)
        if(data){
          this.getAllEmployees();
        }
      }, error=>{
        console.log(error)
      })
    }
    else{
      console.log("Deletion cancelled");
    }
    
  }

onEdit(row){
  console.log(row);
  let empId = this.employeeService.form.get('empId').value;
  //this.service.form.reset();
 // this.service.initializeFormGroup()
  this.employeeService.form.patchValue({empId})
  this.employeeService.populateForm(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.width = "60%";
  dialogConfig.autoFocus = true;
  this.dialog.open(EmployeeComponent, dialogConfig)

}


}
