import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

import { SocketIOService } from './../../core/socket-io.service'
import { HighstockChartService } from './../../core/highstock-chart.service'

@Component({
  selector: 'app-home',
  template: `
    <h1 class="text-center">Stock Chart App</h1>
    <h1 class="text-center" *ngIf="!this.cs.numberOfStocks">Loading...<app-loading></app-loading></h1>
    <div [ngClass]="{'loading': !this.cs.numberOfStocks}">
      <app-chart [options]="options"></app-chart>
      <app-search></app-search>
      <app-stocks></app-stocks>
    </div>
  `,
  styles: [`
    .loading {
      opacity: 0;
    }
  `]
})

export class HomeComponent {

  options: object
  chart: any

  constructor(
    private io: SocketIOService,
    public cs: HighstockChartService
  ) {
    this.options = {
      // NOTE: Navigator doesn't update with new data
      navigator: {
        enabled: false
      },
      series: []
    }
  }
}
