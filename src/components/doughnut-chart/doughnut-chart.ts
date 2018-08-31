import { ViewChild, Component, ElementRef, OnInit, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js'

/**
 * Generated class for the DoughnutChart component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'doughnut-chart',
  templateUrl: 'doughnut-chart.html'
})
export class DoughnutChart implements  OnInit {


  @ViewChild('DoughnutChart') doughnutChart: ElementRef;
  @Input("VectorData")vectordata: number[];
  @Input("ChartType")chartType: string;
  vectorInfo: any;
  loaded = false;
  chart: any = null
  constructor() { this.vectorInfo = this.vectordata;}
    
   ngOnInit(){
       this.createCharts()

    }
    
    createCharts(doughnutData?: number[]){
         if(this.loaded ==  true ){
             this.chart.config.data.datasets[0].data = doughnutData ? doughnutData : this.vectordata
             this.chart.update();
            }
        else{
            let displayBoolean = this.chartType == "bar" ? true : false
            let donutCtx = this.doughnutChart.nativeElement.getContext('2d');
            var data = {
               labels: ["1", "2", "3", "4", "5", "7", "8", "9", "10"],
                datasets: [
                    {
                        "data":  this.vectordata,   // Example data
                        "backgroundColor": [ 'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                            "#1fc8f8",
                            "#76a346",
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                           
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(255, 206, 86, 0.5)'
                        ],
                         hoverBackgroundColor: [
              
                "#974fa0",
                  "#fb9e28"
              ]
                    }]
            };
    
            this.chart = new Chart(
                donutCtx,
                {
                    "type": this.chartType,
                    "data": data,
                    "options": {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                     scales: {
                         xAxes: [
                             {
                            gridLines: {
                                display:false,
                                
                            },
                            display: false
                        }],
                        yAxes: [{
                            gridLines: {
                                display: displayBoolean
                            },
                            
                    display: displayBoolean
                 
                        }]
                        },
                        "rotation": 0.05 * Math.PI,
                        "cutoutPercentage": 50,
                        "animation": {
                            "animateScale": true,
                            "animateRotate": false
                        }
                    }
                }
            );
          this.loaded = true;
            }
        }


}



