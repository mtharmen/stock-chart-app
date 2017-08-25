import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';

import { ApiService } from './core/api.service'
import { SocketIOService } from './core/socket-io.service'
import { HighstockChartService } from './core/highstock-chart.service'

// https://github.com/gevgeny/angular2-highcharts/issues/176
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}

import { ChartComponent } from './component/chart/chart.component';
import { SearchComponent } from './component/search/search.component';
import { StocksComponent } from './component/stocks/stocks.component';
import { HomeComponent } from './component/home/home.component';
import { LoadingComponent } from './core/loading.component';
import { FooterComponent } from './component/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SearchComponent,
    StocksComponent,
    HomeComponent,
    LoadingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    SocketIOService,
    HighstockChartService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
