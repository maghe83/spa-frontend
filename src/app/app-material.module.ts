import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableExporterModule } from 'mat-table-exporter';

const MATERIAL_MODULES = [
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule,
  MatTableExporterModule,
];

@NgModule({
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: MATERIAL_MODULES,
})
export class AppMaterialModule {}
