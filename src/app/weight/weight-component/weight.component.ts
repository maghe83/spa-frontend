import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { KistlerRecord } from 'src/app/model/kistler/KistlerRecord';
import { KistlerService } from 'src/app/service/kistler.service';
import * as XLSX from 'xlsx';
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
export class WeightComponent implements OnInit, AfterViewInit {
  columnHeaders = [
    {
      columnDef: 'grossWeightInKg',
      header: 'Kg',
      cell: (element: KistlerRecord) => element.grossWeightInKg,
    },
    {
      columnDef: 'measurementDateTimeInMills',
      header: 'Data',
      cell: (element: KistlerRecord) =>
        moment(element.measurementDateTimeInMills),
    },
    {
      columnDef: 'velocityInKmH',
      header: 'Km/h',
      cell: (element: KistlerRecord) => element.velocityInKmH,
    },
    {
      columnDef: 'direction',
      header: 'Direzione',
      cell: (element: KistlerRecord) => element.direction,
    },
    {
      columnDef: 'vehicleLengthInM',
      header: 'Lunghezza Veicolo',
      cell: (element: KistlerRecord) => element.vehicleLengthInM,
    },
    {
      columnDef: 'axlesCount',
      header: 'Numero Assi',
      cell: (element: KistlerRecord) => element.axlesCount,
    },
  ];

  displayedColumns: string[] = [
    'grossWeightInKg',
    'measurementDateTimeInMills',
    'velocityInKmH',
    'direction',
    'vehicleLengthInM',
    'axlesCount',
  ];
  dataSource: MatTableDataSource<KistlerRecord>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('pese') pese!: ElementRef;

  constructor(kistlerservice: KistlerService) {
    this.dataSource = new MatTableDataSource(
      kistlerservice.getKistlerDataSource()
    );
  }
  ngOnInit(): void {}

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

  exportCsv() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
