import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Employee from './ods';
import { EmployeeService } from './ods.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import ODS from './ods';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }

  public employees!: ODS[];


  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: ODS[]) => {this.employees = response;console.log(this.employees);},
      error:(error: HttpErrorResponse) => {alert(error.message);
       
      }
      // complete: () => console.info('complete') 

    });
  }


  
  public onAddEmloyee(addForm: NgForm): void {
    // document.getElementById('add-employee-form').click();
    var data = JSON.parse(addForm.value.name)
    for(var i =0; i < data.length; i++){
    console.log(data[i])
    this.employeeService.addEmployee(data[i]).subscribe({
      next:(response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
     // complete: () => console.info('complete') 
  });
   }
  }
}