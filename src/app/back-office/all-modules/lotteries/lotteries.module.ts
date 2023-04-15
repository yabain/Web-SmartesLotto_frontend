import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotteriesRoutingModule } from './lotteries-routing.module';
import { LotteriesComponent } from './lotteries.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [LotteriesComponent],
  imports: [
    CommonModule,
    LotteriesRoutingModule,
    RouterModule,
    DataTablesModule
  ]
})
export class LotteriesModule { }
