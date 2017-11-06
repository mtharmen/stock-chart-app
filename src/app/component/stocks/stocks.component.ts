import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

import { SocketIOService } from './../../core/socket-io.service'

@Component({
  selector: 'app-stocks',
  template: `
    <div class="row mt-3">
      <ng-container *ngFor="let stock of stocks">
        <div class="card col-6 col-lg-3">
          <div class="card-body">
            <span id="remove" class="float-right" (click)="handleClick(stock)">&times;</span>
            <p>{{stock}}</p>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    #remove {
      top: -5px;
      right: 10px;
      position: absolute;
      font-size: 30px;
      cursor: pointer;
    }
  `]
})
export class StocksComponent implements OnDestroy {

  addStockSub: Subscription
  removeStockSub: Subscription
  stocks = []

  constructor(private io: SocketIOService) {
    this.addStockSub = this.io
      .addStock$
      .subscribe(
        stock => {
          this.add(stock.name)
        }
      )

      this.removeStockSub = this.io
      .removeStock$
      .subscribe(
        code => {
          this.remove(`(${code})`)
        }
      )
  }

  add(company) {
    if (this.stocks.indexOf(company) === -1) {
      this.stocks.push(company)
    }
  }

  handleClick(company): void {
    if (this.stocks.length < 2) {
      alert('Must have at least one stock at all times')
    } else {
      const code = this.remove(company)
      this.io.removeStock(code)
    }
  }

  remove(company): string {
    const code = company.split('(')[1].replace(')', '').trim()
    this.stocks = this.stocks.filter(stock => stock.indexOf(code) === -1)
    return code
  }

  ngOnDestroy() {
    this.addStockSub.unsubscribe()
    this.removeStockSub.unsubscribe()
  }

}
