import { Component } from '@angular/core';

import { SocketIOService } from './../../core/socket-io.service'
import { HighstockChartService } from '../../core/highstock-chart.service'

// TODO: add autocomplete

@Component({
  selector: 'app-search',
  template: `
    <form class="row justify-content-center">
      <div class="input-group col-8 mt-3">
        <input class="form-control" name="search" type="text" placeholder="Enter a stock code (eg. AAPL)" [(ngModel)]="input.search" #search="ngModel" required/>
        <span class="input-group-btn">
          <button class="btn btn-primary" type="submit" (click)="add()" [disabled]="!input.search">
            <span *ngIf="!io.loading">Search</span>
            <app-loading *ngIf="io.loading"></app-loading>
          </button>
        </span>
      </div>
    </form>
  `,
  styles: []
})
export class SearchComponent {

  input = { search: '' }

  constructor(
    public io: SocketIOService,
    private cs: HighstockChartService
  ) { }

  add(): void {
    if (this.cs.numberOfStocks > 9) {
      alert('Max of 10 Stocks at a time')
    } else {
      const code = this.input.search.toUpperCase()
      this.input.search = ''
      this.io.addStock(code)
    }
  }

  remove(): void {
    const code = this.input.search.toUpperCase()
    this.io.removeStock(code)
  }

}
