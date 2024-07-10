import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemsPannelComponent } from '../components/items-pannel/items-pannel.component';
import { EmployeesComponent } from '../components/employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkComponent } from '../components/work/work.component';
import { EarningsService } from '../services/earnings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ItemsPannelComponent,
    EmployeesComponent,
    HttpClientModule,
    WorkComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public earningsService: EarningsService) {}
}
