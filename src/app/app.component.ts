import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-root',
  template: `
  <div id="wrapper">
    <div id="content" class="container">
      <br>
      <app-home></app-home>
    </div>
  </div>
  <app-footer></app-footer>
  `,
  styles: []
})

export class AppComponent { }
