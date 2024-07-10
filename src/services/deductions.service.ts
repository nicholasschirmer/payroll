import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Deductions } from '../models/deductions';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DeductionsService {
  deductions = signal<Deductions[]>([]);
  deductionsTotal = signal<number>(0);
  currentEmployeeDeductions = signal<Deductions[]>([]);

  constructor(private http: HttpClient) {}

  getDeductions$(): Observable<Deductions[]> {
    return this.http.get<Deductions[]>(
      environment.baseHref + 'deductions.json'
    );
  }
}
