import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Employee } from 'app/model/employee';
import {Guid} from "guid-typescript"
import { from, Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees:Employee[] = []
  employee: Employee;
  baseUrl = "http://localhost:3000/api";
  //mongodb://techspawnassessdb:password123@ds363098.mlab.com:63098/techspawndbatmlab
constructor(private http: HttpClient) { }

form: FormGroup = new FormGroup({
    _id: new FormControl(''),
    empId: new FormControl(''),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    DOB: new FormControl(''),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    gender: new FormControl('Male'),
    Address: new FormControl(null)
    
  });

  initializeFormGroup() {
    this.form.setValue({
      
      empId: '',
      fullName: '',
      email: '',
      DOB: '',
      mobile: '',
      gender: '1',
      Address: ''
    });
  }
  getEmployees(): Observable<any>{
    return this.http.get( this.baseUrl + '/employees');
  }

  addEmployee(employee: Employee){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/addEmployee', employee, {headers: headers});
  }
  deleteEmployee(id: any){
    return this.http.delete(this.baseUrl+ '/employee/'+id);
  }

  updateEmployee(employee: Employee){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUrl+ '/employee/'+employee._id,employee, {headers: headers});
  }

  populateForm(employee){
    this.form.patchValue(employee)
  }

 
}
