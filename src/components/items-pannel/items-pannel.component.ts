import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-items-pannel',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './items-pannel.component.html',
  styleUrl: './items-pannel.component.scss',
})
export class ItemsPannelComponent implements OnInit {
  items = [{ name: 'Item 1', id: 1, icon: 'home' }];

  constructor() {}

  ngOnInit() {
    console.log('ItemsPannelComponent');
  }
}
