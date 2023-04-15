import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { LottoListComponent } from './lotto-list.component';

@NgModule({
  declarations: [
    LottoListComponent
],
imports: [
  CommonModule,
  RouterModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  })
],
exports: [
  LottoListComponent
]
})
export class LottoListModule { }
