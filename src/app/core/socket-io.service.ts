import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/catch'

import * as io from 'socket.io-client'

@Injectable()
export class SocketIOService {

  private socket: any
  // TODO make model for stocks
  test$ = new Subject<string>()
  addStock$ = new Subject<any>()
  removeStock$ = new Subject<string>()
  loading: boolean

  constructor() {

    this.socket = io('http://localhost:8080')

    this.socket.on('error', error => {
      console.log(error)
    })

    this.socket.on('addStock', data => {
      this.loading = false
      this.addStock$.next(data)
    })

    this.socket.on('removeStock', code => {
      this.removeStock$.next(code)
    })

    this.socket.on('stockError', error => {
      console.error(error)
      if (error.message.indexOf('You have submitted an incorrect Quandl code.') > -1) {
        alert('Invalid Code')
      }
    })
  }

  addStock(code): void {
    this.loading = true
    this.socket.emit('clientAddStock', code)
  }

  removeStock(code): void {
    this.socket.emit('clientRemoveStock', code)
  }

}
