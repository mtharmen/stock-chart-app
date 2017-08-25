import { Injectable, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

import { SocketIOService } from './socket-io.service'

@Injectable()
export class HighstockChartService implements OnDestroy {

  private chart: any
  private addStockSub: Subscription
  private removeStockSub: Subscription

  constructor(private io: SocketIOService) {
    this.addStockSub = this.io
      .addStock$
      .subscribe(
        data => {
          this.addStock(data)
        }
      )

    this.removeStockSub = this.io
      .removeStock$
      .subscribe(
        code => {
          this.removeStock(code)
        }
      )
  }

  setChart(chart): void {
    this.chart = chart
  }

  addStock(data): void {
    const i = this.chart.series.findIndex(stock => stock.name === data.name)
    if (i === -1) {
      this.chart.addSeries(data)
    }
  }

  removeStock(code): void {
    const i = this.chart.series.findIndex(stock => stock.name.indexOf(`(${code})`) > -1)
    this.chart.series[i].remove()
  }

  get numberOfStocks(): number {
    if (this.chart) {
      return this.chart.series.length
    }
    return 0
  }

  ngOnDestroy(): void {
    this.addStockSub.unsubscribe()
    this.removeStockSub.unsubscribe()
  }

}
