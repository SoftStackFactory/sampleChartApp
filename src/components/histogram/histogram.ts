import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as d3 from 'd3';

/**
 * Generated class for the Histogram component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'histogram',
  templateUrl: 'histogram.html'
})
export class Histogram implements  AfterViewChecked{
  @Input()data: number;
  @Input("nameOfData")nameOfData: any;
  
  @Input("myData")dataTs: any;
  //@Input("name") name: any;

  nameOfData2: any;
  x: any;
  items: any[] = [];
  id: string;
  loaded: boolean = true;
  
  constructor(public navCtrl: NavController) {
      this.nameOfData2 = this.nameOfData

  }
  
 //Runs after the view is built. Must be run after view otherwise the element will not be targetable by the create histogram function
  ngAfterViewChecked(){ 
   if (this.loaded){
    let test2 = "." + this.nameOfData
    this.createHistogram(test2)
    this.loaded = false;
    }
  }


  // TODO each histogram has 10 bins, each value from from company histogram (L6) is a precent of how high the bin should go


   
    //Generates random data for the histogram
    createHistogram(test2){
    //var data = d3.range(1000).map(d3.randomBates(10));
    var data =  [0,0,.2,0,.1,.3,.7,.1,0]
   let test = ".histogram-container"
   //Format on the numbers
    var formatCount = d3.format(",.0f");
  // appends the svg to the .histogram-container
    var svg = d3.select(test2)
              .append("svg")
              .attr("class", "histogram")
              .attr("width",  "100%")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr('viewBox','0 0 700 200')
    
    //Sets with of the histogram, not the svg itself.
    let width = 700;
    
    let   margin = {top: 10, right: 30, bottom: 30, left: 30}
    //let  width = +svg.attr("width") - margin.left - margin.right
   // let  height = +svg.attr("height") - margin.top - margin.bottom
   let height = 170;
    let   g = svg.append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // sets the bottom x scale
    this.x = d3.scaleLinear()
    //Range sets the x axis and round interpolates
        .rangeRound([0, width]);
    let x2= this.x
    
    var bins = d3.histogram()
      //Domain sets the min and max for the data
         .domain([0, .1])
      //Number of Bins, and bin ranges
        .thresholds([0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9, 1])
        (data);

    // Creates a linear scale from the data using .domain() and applies that to the view with .range().  For example
    // domain([1, 1000]) and .range([1, 100]). allows us to scale values down to the view size.
    var y = d3.scaleLinear()
        //Sets the min and max height from domain
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        //Sets the height of bins scale relative to our histogram
        .range([height, 0]);
    
    // Makes a <g> group for each bin that will include the text and rect. This way you can position both elements as one.
    var bar = g.selectAll(".bar")
      .data(bins)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { 
        return "translate(" + x2(d.x0) + "," + y(d.length) + ")"; 
      });
  
    //Bins, x is position of each bin, width is computed from the data set. Height is from the data
    bar.append("rect")
        .attr("x", 1)
        .attr("fill", "steelblue")
        .attr("width", x2(bins[0].x1) - x2(bins[0].x0) - 1)
        .attr("height", function(d) { 
          let t = y(d.length)

          return height - y(d.length); });
    

    //Text color needs to match background color so the empty bins dont have a 0 value showing below
    bar.append("text")
        .attr("dy", ".75em")
        //bin value text height
        .attr("y", 7)
        .attr("x", (x2(bins[0].x1) - x2(bins[0].x0)) / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#f8f8f8")
        .text(function(d) { 
          return formatCount(d.length); 
        });
    
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x2));
   
    }
  
  
 
}
