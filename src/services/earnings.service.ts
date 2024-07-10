import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Earnings } from '../models/earnings';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EarningsService {
  earnings = signal<Earnings[]>([]);
  earningsTotal = signal<number>(0);
  currentEmployeeEarnings = signal<Earnings[]>([]);

  constructor(private http: HttpClient) {}

  getEarnings$(): Observable<Earnings[]> {
    return this.http.get<Earnings[]>(environment.baseHref + 'work.json');
  }
}
