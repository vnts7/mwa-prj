import { Component, OnInit, ViewChild } from '@angular/core'; 
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation'; 
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment'; 
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

  constructor(private http: HttpClient, private authService : AuthService) { } 
  
  ngOnInit() {
    this.getData();
  }
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Calories Need' },
    { data: [], label: 'Calories Taken' }, 
  ];
  public lineChartLabels: Label[] = [];

  sub : Subscription;
  getData() {
    var lastWeekTime =  this.getLast2WeekStart(); 
    console.log(lastWeekTime.unix(), lastWeekTime.format("MM/DD/YYYY"))
    this.sub =   this.http.get('api/profile/chart/' + this.authService.user._id + "?date="+lastWeekTime.unix()).subscribe( (res : Array<any>) => { 
        res.forEach(element => { 
          var time = moment.unix(element.date).format("MM/DD/YYYY");
           this.lineChartLabels.push(time)
          this.lineChartData[0].data.push(Number(element.calorieNeeds))
          this.lineChartData[1].data.push(Number(element.sumTakenCalorie  ))
        }); 
        console.log('chartDatasets', this.lineChartData,this.lineChartLabels)
    });
    
  }

  getLast2WeekStart() {
    var today = moment();
    var daystoLastMonday = 0 - (1 - today.isoWeekday()) + 15;
    var lastMonday = today.subtract('days', daystoLastMonday);
    return lastMonday;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
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
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // purple
      backgroundColor: 'rgba(221,211,238)',
      borderColor: '#673ab7',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    } 
  ];
}