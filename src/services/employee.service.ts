import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public selectedEmployee = signal<Employee>({} as Employee);
  public hasSelectedEmployee = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getEmployees$(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.baseHref + 'employees.json');
  }
}
