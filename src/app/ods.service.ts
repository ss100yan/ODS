import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ODS from './ods';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getEmployees(): Observable<ODS[]> {
    return this.http.get<ODS[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: ODS): Observable<ODS> {
    return this.http.post<ODS>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: ODS): Observable<ODS> {
    return this.http.put<ODS>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}