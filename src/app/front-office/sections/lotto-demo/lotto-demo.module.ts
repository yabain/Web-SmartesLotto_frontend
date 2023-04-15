import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LottoDemoComponent } from './lotto-demo.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';

@NgModule({
  declarations: [
    LottoDemoComponent
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
    LottoDemoComponent
]
})
export class LottoDemoModule { }
