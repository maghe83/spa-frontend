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
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { KistlerRecord } from 'src/app/model/kistler/KistlerRecord';
import { KistlerService } from 'src/app/service/kistler.service';
import * as XLSX from 'xlsx';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

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
  dataSource!: MatTableDataSource<KistlerRecord>;
  chartData = [];
  chartType = 'bar';
  public chartOptions!: Partial<ChartOptions>;
  public val1: number = 0;
  public val2: number = 0;
  public perc: number = 0;
  public largest: KistlerRecord[] = [];
  @ViewChild('chart') chart!: ChartComponent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('pese') pese!: ElementRef;

  constructor(private kistlerservice: KistlerService) {}
  ngOnInit(): void {
    this.kistlerservice.getKistlerDataSource().subscribe(
      (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.val1 = response.filter(
          (record) => record.grossWeightInKg > 7500
        ).length;
        this.val2 = response.filter(
          (record) => record.grossWeightInKg > 44000
        ).length;
        this.perc =
          response.length == 0 ? 0 : (100 * this.val2) / response.length;
        response.sort((kr1, kr2) =>
          kr1.grossWeightInKg < kr2.grossWeightInKg
            ? 1
            : kr1.grossWeightInKg > kr2.grossWeightInKg
            ? -1
            : 0
        );
        this.largest = response.slice(0, 3);
      },
      (error) => console.log(error)
    );
  }

  ngAfterViewInit() {}

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

  loadChart() {
    let dataArray: number[] = [];
    let dataLabel: number[] = [];
    this.dataSource.data.map((data) => {
      dataArray.push(data.velocityInKmH);
      dataLabel.push(data.measurementDateTimeInMills);
    });
    this.chartOptions = {
      series: [
        {
          name: 'speed',
          data: dataArray,
        },
      ],
      chart: {
        height: 500,
        type: 'bar',
      },
      title: {
        text: `speed chart`,
      },
      xaxis: {
        type: 'datetime',
        categories: dataLabel,
      },
    };
  }
}
