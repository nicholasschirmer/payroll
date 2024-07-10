import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EarningsService } from '../../services/earnings.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'type',
    'quantity',
    'rate',
    'actions',
  ];

  earningsForm = new FormGroup({
    search: new FormControl(''),
  });

  dataSource = new MatTableDataSource(
    this.earningsService.currentEmployeeEarnings().filter((earning) => {
      if (
        this.earningsForm.get('search')?.value === '' ||
        !this.earningsForm.get('search')?.value === undefined
      ) {
        return true;
      } else {
        return earning.name
          .toLowerCase()
          .includes(this.earningsForm.value.search!);
      }
    })
  );

  constructor(
    public earningsService: EarningsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  filterForm() {
    console.log(this.earningsForm.value.search!);

    this.dataSource = new MatTableDataSource(
      this.earningsService.currentEmployeeEarnings().filter((earning) => {
        if (
          this.earningsForm.get('search')?.value === '' ||
          !this.earningsForm.get('search')?.value === undefined
        ) {
          return true;
        } else {
          return earning.name
            .toLowerCase()
            .includes(this.earningsForm.value.search!);
        }
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  //the following comments are from angular material documentation
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
