import { TestBed, inject } from '@angular/core/testing';

import { HighstockChartService } from './highstock-chart.service';

describe('HighstockChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighstockChartService]
    });
  });

  it('should be created', inject([HighstockChartService], (service: HighstockChartService) => {
    expect(service).toBeTruthy();
  }));
});
