import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { EarningsService } from '../../services/earnings.service';
import { Earnings } from '../../models/earnings';
import { DeductionsService } from '../../services/deductions.service';
import { Deductions } from '../../models/deductions';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  _employees: Employee[] = [];

  constructor(
    public employeeService: EmployeeService,
    public earningsService: EarningsService,
    public deductionsService: DeductionsService
  ) {}

  getEmployees(): void {
    this.employeeService.getEmployees$().subscribe({
      next: (employees: Employee[]) => {
        this._employees = employees;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        console.log(error);
        this._employees = [] as Employee[];
      },
    });
  }

  chooseEmployee(employee: Employee): void {
    this.employeeService.selectedEmployee.set(employee);
    this.employeeService.hasSelectedEmployee.set(true);
    this.getTotalEarnings(employee);
    this.getTotalDeductions(employee);
  }

  unchooseEmployee(): void {
    this.employeeService.hasSelectedEmployee.set(false);
    this.earningsService.currentEmployeeEarnings.set([]);
  }

  // function takes in employee sets there current earnings to an array of the total earnings filtered
  // by employee and the totals the amounts owed by the quantity of work
  // innefficient as it recalculates the total each time a new employee is selected and would be faster with
  // the use of a back end service or a better mapping technique going forward
  getTotalEarnings(employee: Employee): void {
    this.earningsService.currentEmployeeEarnings.set(
      this.earningsService
        .earnings()
        .filter((e) => e.employee_id === employee.employee_id)
    );
    this.earningsService.earningsTotal.set(
      this.earningsService
        .currentEmployeeEarnings()
        .reduce((acc, e) => acc + e.quantity * e.rate, 0)
    );
  }

  getEarnings(): void {
    this.earningsService.getEarnings$().subscribe({
      next: (earnings: Earnings[]) => {
        this.earningsService.earnings.set(earnings);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.earningsService.earnings.set([] as Earnings[]);
      },
    });
  }

  getDeductions(): void {
    this.deductionsService.getDeductions$().subscribe({
      next: (deductions: Deductions[]) => {
        this.deductionsService.deductions.set(deductions);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.deductionsService.deductions.set([] as Deductions[]);
      },
    });
  }

  getTotalDeductions(employee: Employee): void {
    this.deductionsService.currentEmployeeDeductions.set(
      this.deductionsService
        .deductions()
        .filter((d) => d.employee_id === employee.employee_id)
    );
    console.log(this.deductionsService.currentEmployeeDeductions());

    this.deductionsService.deductionsTotal.set(
      this.deductionsService
        .currentEmployeeDeductions()
        .reduce((acc, d) => acc + d.value, 0)
    );
  }

  //because this is pulling from json files I am not too stressed on load order but in
  ngOnInit(): void {
    this.getEmployees();
    this.getEarnings();
    this.getDeductions();
  }
}
