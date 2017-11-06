import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/catch'

import * as io from 'socket.io-client'

@Injectable()
export class SocketIOService {

  private socket: any
  // TODO make model for stocks
  throttled$ = new Subject<string>()
  addStock$ = new Subject<any>()
  removeStock$ = new Subject<string>()
  loading: boolean

  constructor() {
    const host = window.location.hostname !== 'localhost' ? window.location.origin : 'http://localhost:8080'
    this.socket = io(host)

    this.socket.on('error', error => {
      console.error(error)
    })

    this.socket.on('addStock', data => {
      this.throttled$.next('')
      this.loading = false
      this.addStock$.next(data)
    })

    this.socket.on('removeStock', code => {
      this.removeStock$.next(code)
    })

    this.socket.on('stockError', error => {
      this.loading = false
      // console.error(error)
      if (error.indexOf('You have submitted an incorrect Quandl code.') > -1) {
        alert('Unrecognized Stock Code')
      } else if (error.indexOf('-') > -1) {
        alert('Error retrieving data from Quandl')
      } else if (error.indexOf('Quandl API throttled') > -1) {
        alert(error)
        this.throttled$.next(error)
      } else {
        alert(error)
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
