
import { Component } from '@angular/core'

@Component({
  selector: 'app-loading',
  template: `
      <img src="/assets/loading.svg">
  `,
  styles: [`
    img {
      margin: -20px auto;
      width: 50px;
    }
  `]
})
export class LoadingComponent { }
