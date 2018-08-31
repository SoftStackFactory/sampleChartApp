import { ViewChild, Component, ElementRef, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js'


@Component({
  selector: 'bar-chart',
  templateUrl: 'bar-chart.html'
})
export class BarChart implements  OnInit, OnChanges{

  @ViewChild('BarChart') barChart: ElementRef;
  @Input("VectorData")vectordata: number[];
  @Input("ChartType")chartType: string;
  @Input('Number') currentChartNum: number;
  @Input('XYLabels') xyLabels: string[];
  @Input("Labels") labels: string[];
  @Input("DataObject") firmoData: any;
  loaded = false;
  chart: any = null

  //Colors for doughnut chart on Market Page
  doughnutColors = ['rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',]
    //Colors for odd number bar charts
  barChartColors1 = 'rgba(54, 162, 235, 0.5)';
  
  //Colors for even number bar charts
  barChartColors2 =  'rgba(75, 192, 192, 0.5)';
  
  constructor() {
      Chart.defaults.global.defaultColor =    'rgba(54, 162, 235, 0.5)';
  }
    
    //Lifecycle that fires one each initialization for the Component
   ngOnInit(){
        this.createCharts()
    
    }
      //Lifecycle that fires on each change, used to update the charts when data changes.
      ngOnChanges(changes: SimpleChanges ) {
         
           if (this.chart != null){
               this.chart.config.data.datasets[0].data = changes.vectordata.currentValue
               this.chart.update();
           }
      }
        // takes in current chart type and returns the color for which type;
    useColors (currentChart){
        if ( currentChart == "bar" && this.currentChartNum % 2 == 0){
            return this.barChartColors1
        }
        else if ( currentChart == "bar" && this.currentChartNum % 2 == 1){
          return this.barChartColors2      
        }
        else{
            return this.doughnutColors
        }
    }

      //Creates Charts uses @input vectordata
      createCharts(barChartData?: number[]){
        let displayBoolean = this.chartType == "bar" ? true : false
        let donutCtx = this.barChart.nativeElement.getContext('2d');
        let showTitle = this.firmoData ? true : false;
        let xLabel = "asdfasdf"
        let yLabel = ""
        let title = ""
        let labels = ["1", "2", "3", "4", "5", "7", "8", "9", "10"]
        if ( this.firmoData != undefined ){
                xLabel  = this.firmoData.xLabel
                yLabel = this.firmoData.yLabel
                title = this.firmoData.title
                labels = this.firmoData.labels
                console.log("fired", xLabel)
        }
       
        var data = {
           labels: labels,
            datasets: [
                {
                    "data":  this.vectordata,   // Example data
                    "backgroundColor": this.useColors(this.chartType)
                   
                    ,
                     hoverBackgroundColor: 

          //  "#974fa0"
             "#fb9e28"
          
                }]
        };

        this.chart = new Chart(
            donutCtx,
            {
                "type": this.chartType,
                "data": data,
                "options": {
                  
                    title:{
                        display:  showTitle,
                        text: title,
                        position: "top",
                        fontSize: 16,
                        fontColor: "#000000",
                        fontStyle: 'bold'
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                 scales: {
                     xAxes:[{ 
                        scaleLabel: {
                            display: true,
                            labelString: xLabel
                            },
                        gridLines: {
                                display:false,
                        },
                        display: showTitle
                    }],
                    yAxes: [{
                        scaleLabel:{
                            display: showTitle,
                            labelString: yLabel
                    },
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
