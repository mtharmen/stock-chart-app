import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HighstockChartService } from '../../core/highstock-chart.service'

@Component({
  selector: 'app-chart',
  template: `
    <div class="row justify-content-center mt-3">
        <chart type="stockChart" [options]="options" (load)="saveInstance($event.context)"></chart>
    </div>
  `,
  styles: []
})
export class ChartComponent {

  @Input() options: any

  constructor(private cs: HighstockChartService) { }

  saveInstance(chartInstance): void {
    this.cs.setChart(chartInstance)
  }
}
