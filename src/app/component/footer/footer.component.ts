import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer class="footer text-center">
    <div class="container">
      <p><small>
        <a href="https://www.freecodecamp.com/challenges/chart-the-stock-market" target="_blank">FCC Stock Chart App</a> | 
        <a href="https://github.com/mtharmen/stock-chart-app" target="_blank"> GitHub Repo <i className="fa fa-github" aria-hidden="true"></i></a> | 
        <a href="https://www.quandl.com/" target="_blank"> Data from Quandl </a> | 
        <a href="http://www.highcharts.com/" target="_blank"> Chart from HighCharts</a>
      </small></p>
    </div>
  </footer>
  `,
  styles: []
})
export class FooterComponent { }
