import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Outcome } from '../outcome';
import { Weight } from '../weight';

const ELEMENT_DATA: Weight[] = [
  {
    timestamp: 1631179193202,
    outcome: Outcome.ok,
    plate: 'AB123CD',
    weight: 55.7,
  },
  {
    timestamp: 1631179225549,
    outcome: Outcome.ok,
    plate: 'EF456GH',
    weight: 23.1,
  },
  {
    timestamp: 1631179233661,
    outcome: Outcome.ko,
    plate: 'IL789MN',
    weight: 12.9,
  },
  {
    timestamp: 1631181401985,
    outcome: Outcome.ok,
    plate: 'KL453NM',
    weight: 44.0,
  },
  {
    timestamp: 1631181428339,
    outcome: Outcome.ko,
    plate: 'VB028NM',
    weight: 34.9,
  },
  {
    timestamp: 1631181548452,
    outcome: Outcome.ok,
    plate: 'XZ510FK',
    weight: 6.1,
  },
];

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent implements AfterViewInit {
  columnHeaders = [
    {
      columnDef: 'timestamp',
      header: 'Data',
      cell: (element: Weight) => moment(element.timestamp),
    },
    {
      columnDef: 'outcome',
      header: 'Esito',
      cell: (element: Weight) => element.outcome,
    },
    {
      columnDef: 'plate',
      header: 'Targa',
      cell: (element: Weight) => element.plate,
    },
    {
      columnDef: 'weight',
      header: 'Peso',
      cell: (element: Weight) => element.weight,
    },
  ];

  displayedColumns: string[] = [
    'timestamp111',
    'timestamp222',
    'pippo',
    'timestamp',
    'outcome',
    'plate',
    'weight',
  ];
  dataSource: MatTableDataSource<Weight>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
