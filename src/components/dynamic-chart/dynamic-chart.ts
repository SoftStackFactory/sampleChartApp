import { Component, ViewChild } from '@angular/core';
import Chart from 'chart.js';
 
@Component({
  selector: 'base-chart-demo',
  templateUrl: './dynamic-chart.html'
  
})
export class DynamicChartComponent {
  @ViewChild('barCanvas') barCanvas;

  myChart;  
  barChartColors = ['#EE6352', '#08B2E3', '#EE6352', '#08B2E3', '#EE6352', '#08B2E3', '#EE6352']
  myChartData = {
    type: 'line',
    data: {
      labels: ["2012", "2013", "2014", "2015", "2015", "2017", "2018"],
      datasets: [{
        label: '# of Votes',
        data: [14, 11, 12, 9.8, 8, 8, 7],
        backgroundColor: this.barChartColors,
        fill: false,
      }],
      // This, if it exists at all, defines the highlight region.
      yHighlightRange : {
        begin: 0,
        end: 10
      },
    },
    options: {
      legend: {
        display: false,
      },
      elements: {
        line: {
            tension: 0,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 20,
          },
          gridLines: {
            display: false,
          },
          display: false,
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
        }],
      }
    }
  }

  constructor() {  }


  ngOnInit(){ 
    // The original draw function for the line chart. This will be applied after we have drawn our highlight range (as a rectangle behind the line chart).
    var originalLineDraw = Chart.controllers.line.prototype.draw;
    // Extend the line chart, in order to override the draw function.
    Chart.helpers.extend(Chart.controllers.line.prototype, {
      draw : function() {
        let chart = this.chart;
        // Get the object that determines the region to highlight.
        let yHighlightRange = chart.config.data.yHighlightRange;
    
        // If the object exists.
        if (yHighlightRange !== undefined) {
          let ctx = chart.chart.ctx;
    
          // let yRangeBegin = yHighlightRange.begin;
          // let yRangeEnd = yHighlightRange.end;
    
          let xaxis = chart.scales['x-axis-0'];
          let yaxis = chart.scales['y-axis-0'];
    
          // let yRangeBeginPixel = yaxis.getPixelForValue(yRangeBegin);
          // let yRangeEndPixel = yaxis.getPixelForValue(yRangeEnd);
    
          ctx.save();
          
          let i;
          for (i = 0; i < 2; i++ ) {
            if (i === 0) {
              ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
              ctx.fillRect(xaxis.left, yaxis.getPixelForValue(10), xaxis.right - xaxis.left, yaxis.getPixelForValue(0) - yaxis.getPixelForValue(10) )
            }
            else {
              ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
          ctx.fillRect(xaxis.left, yaxis.getPixelForValue(20), xaxis.right - xaxis.left, yaxis.getPixelForValue(0) - yaxis.getPixelForValue(10) )
            }
          }
          ctx.fillStyle = '#FFFFFF';

          ctx.fillRect(xaxis.left, yaxis.getPixelForValue(10), xaxis.right - xaxis.left, 2)
          // The fill style of the rectangle we are about to fill.
         // ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
          // Fill the rectangle that represents the highlight region. The parameters are the closest-to-starting-point pixel's x-coordinate,
          // the closest-to-starting-point pixel's y-coordinate, the width of the rectangle in pixels, and the height of the rectangle in pixels, respectively.
          //ctx.fillRect(xaxis.left, yaxis.getPixelForValue(20), xaxis.right - xaxis.left, yaxis.getPixelForValue(0) - yaxis.getPixelForValue(10) )
          //ctx.fillRect(xaxis.left, Math.min(yRangeBeginPixel, yRangeEndPixel), xaxis.right - xaxis.left, Math.max(yRangeBeginPixel, yRangeEndPixel) - Math.min(yRangeBeginPixel, yRangeEndPixel));
    
          // ctx.restore();
        }
    
        // Apply the original draw function for the line chart.
        originalLineDraw.apply(this, arguments);
      }
    });
    
    this.myChart = new Chart(this.barCanvas.nativeElement, this.myChartData);    

  }
  // lineChart
  public lineChartData = {
    datasets: [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ],
  
};
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';

  public lineChartOptions = {
    scales: {
      xAxes: [{
         gridLines: {
            display: false
         }
      }],
      yAxes: [{
         steps: 1,
         stepValue: 50,
      }]
   },
   yHighlightRange : {
    begin: 0,
    end: 50,
  },
  }
 
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
 
  public randomizeType():void {
    this.myChart.destroy()
    this.myChart = this.myChart.config.type === 'line' ?  new Chart (this.barCanvas.nativeElement, {...this.myChartData, type: 'bar'}) :  new Chart (this.barCanvas.nativeElement, {...this.myChartData, type: 'line'})
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}