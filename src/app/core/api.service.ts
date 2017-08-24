import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/catch'

const base_url = 'http://localhost:8080'

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError(err: Response | any): Observable<any> {
    const errorMsg = err.error ? err.error.message : 'Unabled to complete request'
    return Observable.throw(errorMsg)
  }

  test$(code: string): Observable<any> {
    return this.http
      .get(base_url + '/test/' + code)
      .catch(this.handleError)
  }
}
