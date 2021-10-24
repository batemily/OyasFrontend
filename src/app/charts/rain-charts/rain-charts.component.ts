import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-rain-charts',
  templateUrl: './rain-charts.component.html',
  styleUrls: ['./rain-charts.component.css']
})
export class RainChartsComponent implements OnInit {

  title = 'chartExemple';

  public ChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input()
  public ChartLabels: Label[];
  public ChartLegend = true;

  @Input()
  public ChartData: MultiDataSet;
  public ChartType: ChartType = 'doughnut';

  @Input()
  public donutColors;

  @Input()
  public percent = 10;

  @Input()
  public centimetre: boolean;

  @Input()
  public alertMessage

  constructor() { }

  ngOnInit(): void {
  }

}
