import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-home></app-home>
    </div>
  `,
  styles: []
})

export class AppComponent {

  constructor() { }

}
