import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import { TrackerService } from '../services/tracker.service';
@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {


  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private s: TrackerService) { }

  ngOnInit() {
    this.changePeriod(1);
  }
  public data: ChartDataSets[] = [
    { data: [], label: 'Calories Need' },
    { data: [], label: 'Calories Intake' },
    { data: [], label: 'Weight', yAxisID: 'y-axis-1' },
  ];
  public labels: Label[] = [];

  changePeriod(month) {
    const date = moment().startOf('day').subtract(month, 'month').unix();
    this.s.readFromDate(date).subscribe(r => {
      if (!r.success) { return; }
      this.labels = [];
      this.data[0].data = [];
      this.data[1].data = [];
      this.data[2].data = [];
      r.data.forEach(i => {
        var time = moment.unix(i.date).format("MM/DD/YYYY");
        this.labels.push(time)
        this.data[0].data.push(i.calorieNeeds);
        this.data[1].data.push(i.calorieIntake);
        this.data[2].data.push(i.weight);
      });
    })
  }

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: {
          display: false //this will remove only the label
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(0,0,0,0.1)',
          },
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0)',
          },
          // ticks: {
          //   fontColor: 'red',
          // }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
}