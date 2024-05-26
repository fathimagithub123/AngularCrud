

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { employeeModel } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private server_url = "http://localhost:3000/employee";

  constructor(private http: HttpClient) {}

  saveEmployeeAPI(employee: employeeModel): Observable<employeeModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<employeeModel>(this.server_url, employee, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllEmployeeAPI(): Observable<employeeModel[]> {
    return this.http.get<employeeModel[]>(this.server_url).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeAPI(id: any): Observable<employeeModel> {
    const url = `${this.server_url}/${id}`;
    return this.http.get<employeeModel>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateEmployeeAPI(employee: employeeModel): Observable<employeeModel> {
    const url = `${this.server_url}/${employee.id}`;
    return this.http.put<employeeModel>(url, employee).pipe(
      catchError(this.handleError)
    );
  }

  removeEmployeeAPI(id: any): Observable<any> {
    const url = `${this.server_url}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

