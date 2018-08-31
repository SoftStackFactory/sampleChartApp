import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
//Pages
import { Market } from '../market/market';
//Components
import { TimeDropdown } from '../../components/time-dropdown/time-dropdown';
import { Models } from '../../components/models/models';
import { Campaigns } from '../../components/campaigns/campaigns';
import { Status } from '../../components/status/status';
import { Gauge } from '../../components/classes/gauge';
// Providers
import { FillGauge } from '../../providers/fill-gauge';
import { DataService } from '../../providers/data-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//   // Segment tabs
//   selectedDays: string = '7 Days';
//   selectedModel: string = 'All Models';
//   selectedCampaign: string = 'All Campaigns';
//   selectedStatus: string = 'Any Status';
//   selectedAdd: string = 'Add New';
//   // KPI Values
//   kpiValues: number[] = [];
//   conversions: number;
//   convChange: number;
//   activeMarketCoverage: number;
//   activeCampaigns: number;
//   activeChange: number;
//   campaignsEnding: number;
//   avgLeadScore: number;
//   scoreChange: number;
//   newMarketSegments: number;
//   segmentsChange: number;
//   // ngClass variables
//   class1: number;
//   class2: number;
//   class3: number;
//   class4: number;
//   class5: number;
//   activePage: Boolean;

//   //  .clusters:nth-child(1) {
//   //           //background-color: #9AD2CB;
//   //           background-color: #ddafcd;
//   //       }
//   //       .clusters:nth-child(2) {
//   //           background-color: #ffdfba;
//   //       }
//   //       .clusters:nth-child(3) {
//   //           //background-color: #FEFFBE;
//   //           background-color: #ffffba;
//   //       }
//   //       .clusters:nth-child(4) {
//   //           background-color: #baffc9;
//   //       }
//   //       .clusters:nth-child(5) {
//   //           background-color: #bae1ff;
//   //       }



//   palette1 = ["#f0c65a", "#f67d48", "#0c465e", "#098eaf", "#80c2da", "#c2edd9", "#0f9454"]
//   colors2: string[] = [  "#0c465e", "#098eaf","#f0c65a", "#80c2da", "#0f9454"]
//   colors1: string[] = [ "#098eaf", "#bae1ff", "#0f9454", "#ffdfba" ,"#ddafcd"]
//  colors: string[] = [ " #ddafcd", "#ffdfba", "#ffffba", "#bae1ff", "#baffc9"  ]
//   gauges: Gauge[] = [];
//   clusters: any;

//   constructor(
//     public navCtrl: NavController,
//     public params: NavParams,
//     public popCtrl: PopoverController,
//     public fillGauge: FillGauge,
//     public dataService: DataService) {
//     //Get data from json and assign to 'clusters'
//     this.clusters = this.dataService.getDataset();
//     //Create gauges
//     this.createGauges(this.clusters);
//   }

//     //Lifecycle 'ionViewWillEnter' Fires before page loads
//     ionViewWillEnter() {
//       //set current page to activePage
//       this.activePage = true;
//       //Get random values for KPI
//       this.randomKpiValues();
//       //Create default gauges
//       this.svgGauges(this.gauges);
//       //Observable for active clusters, updates gauges when dataset changes
//       this.dataService.myObservable.subscribe((data) => {
//           //Will execute if page is active
//           if(this.activePage){
//             //Assign new cluster data
//             this.clusters = data;
//             //Removes gauges
//             this.fillGauge.removeGroup();
//             //Create new gauges
//             this.createGauges(this.clusters)
//             this.svgGauges(this.gauges)
//           }
//       });
//     };

//     //Lifecycle 'ionViewWillLeave' Sets page as inactive, otherwise observable will fire when on other pages and try to update dom and throw error.
//     ionViewWillLeave(){
//       this.activePage = false;
//     }

//     // Creates gauges from the clusters data, uses gauge Class found in Component folder.
//     createGauges (clusters: object[]) {
//       //Clear gauges array
//       this.gauges = [];
//         //Create gauge for each cluster then push to gauges array
//         for (let i = 0; i < clusters.length; i++){
//           let fillValue = this.getPercentage(clusters[i])
//           let gauge = new Gauge( this.colors[i] ,fillValue )
//           this.gauges.push(gauge)
//         }
//     }

//     // Creates Gauges after they are made and post them on view, must be invoked after viws is built. 1s param ofr buildGauges on fill gauge service,
//     // is id of element to insert guages too.
//     svgGauges(gauges){
//       for( let i = 0; i < gauges.length; i++){
//         let num = i + 1
//         this.fillGauge.buildGauges("gauge"+num, gauges[i])
//       }
//     }

//     // Creates percent for fill value on gauges
//     getPercentage(clusterData: object) : number {
//       //Returns percentage to be displayed on each gauge
//       return Math.round(clusterData["Tapped Population"] / clusterData["Count"] * 100);
//     }

//     //Navigation to Market when gauge is clicked, will pass value of selected gauge
//     toMarket(value){
//       this.navCtrl.setRoot( Market, {
//         "selectedGauge": value
//       });
//     }

//     //Generates random values for kpi
//     randomKpiValues() {
//       // Set random triangle color
//       // this.class1 = Math.floor(Math.random() * 2);
//       // this.class2 = Math.floor(Math.random() * 2);
//       // this.class3 = Math.floor(Math.random() * 2);
//       // this.class4 = Math.floor(Math.random() * 2);
//       // this.class5 = Math.floor(Math.random() * 2);

//       //Set KPI values
//       this.conversions = Math.floor(Math.random() * 17) + 3;
//       this.activeMarketCoverage = (Math.floor(Math.random() * 22) + 3) * 0.01;
//       this.activeCampaigns = Math.floor(Math.random() * 4) + 3;
//       this.campaignsEnding = Math.floor(Math.random() * 4) + 3;
//       this.avgLeadScore = Math.floor(Math.random() * 25) + 67;
//       this.newMarketSegments = Math.floor(Math.random() * 3) + 2;

//       //Set green/red triangles
//       this.class1 = (this.conversions >= 10) ? 1 : 0;  //Green if conversions >= 10
//       this.class2 = (this.activeMarketCoverage >= 0.10) ? 1 : 0;  //Green if activeMarketCoverage >= 0.10
//       this.class3 = (this.activeCampaigns >= 5) ? 1 : 0;  //Green if activeCampaigns >= 5
//       this.class4 = (this.avgLeadScore >= 75) ? 1 : 0;  //Green if avgLeadScore >= 75
//       this.class5 = (this.newMarketSegments >= 2) ? 1 : 0;  //Green if newMarketSegments >= 2

//       //Set percent change
//       this.randomPercentChange();

//       //Save default random values
//       this.saveDefaultKpi();
//     }

//     //Generates random percent change
//     randomPercentChange(){
//       // Calculate percent change
//       this.convChange = Math.floor(Math.random() * 17) + 3;
//       this.activeChange = Math.floor(Math.random() * 17) + 3;
//       this.scoreChange = Math.floor(Math.random() * 15) + 5;
//       this.segmentsChange = Math.floor(Math.random() * 30) + 1;
//     }

//     //Saves 7 Day default values
//     saveDefaultKpi(){
//       this.kpiValues.push(this.conversions);
//       this.kpiValues.push(this.activeMarketCoverage);
//       this.kpiValues.push(this.activeCampaigns);
//       this.kpiValues.push(this.campaignsEnding);
//       this.kpiValues.push(this.avgLeadScore);
//       this.kpiValues.push(this.newMarketSegments);
//     }

//     //7 Day Values
//     sevenDayKpi(){
//       this.conversions = this.kpiValues[0];
//       this.activeMarketCoverage = this.kpiValues[1];
//       this.activeCampaigns = this.kpiValues[2];
//       this.campaignsEnding = this.kpiValues[3];
//       this.avgLeadScore = this.kpiValues[4];
//       this.newMarketSegments = this.kpiValues[5];
//     }

//     //30 Day Values
//     thirtyDayKpi(){
//       this.sevenDayKpi();
//       this.conversions *= 3;
//       this.activeMarketCoverage *= 1.5;
//       this.activeCampaigns *= 3;
//       this.campaignsEnding *= 3;
//       this.avgLeadScore *= 0.95;
//       this.newMarketSegments *= 2;
//     }

//     //90 Day Values
//     ninetyDayKpi(){
//       this.sevenDayKpi();
//       this.conversions *= 9;
//       this.activeMarketCoverage *= 2.25;
//       this.activeCampaigns *= 9;
//       this.campaignsEnding *= 9;
//       this.avgLeadScore *= 0.855;
//       this.newMarketSegments *= 4;
//     }

//     //1 Year Values
//     yearKpi(){
//       this.sevenDayKpi();
//       this.conversions *= 27;
//       this.activeMarketCoverage *= 3.375;
//       this.activeCampaigns *= 27;
//       this.campaignsEnding *= 27;
//       this.avgLeadScore *= 0.64125;
//       this.newMarketSegments *= 12;
//     }

//     //Segment tab 'Days'
//     //Changes KPI values based on duration selected
//     daysChange(myEvent) {
//       //Create popover displaying time choices
//       let popover = this.popCtrl.create(TimeDropdown);
//         popover.onDidDismiss(data => {
//           //Assign selected days
//           this.selectedDays = data;
//             if(this.selectedDays == null){
//               this.selectedDays = '7 Days';
//             }
//           //Generate new KPI values
//           switch(this.selectedDays) {
//             case '30 Days': {
//               this.thirtyDayKpi();
//               //Set percent change
//               this.randomPercentChange();
//               break;
//             }
//             case '90 Days': {
//               this.ninetyDayKpi();
//               //Set percent change
//               this.randomPercentChange();
//               break;
//             }
//             case '1 Year': {
//               this.yearKpi();
//               //Set percent change
//               this.randomPercentChange();
//               break;
//             }
//             default: {
//               this.sevenDayKpi();
//               break;
//             }
//           }
//         });
//       //Show popover
//       popover.present({
//         ev: myEvent
//       });
//     };

//     //Segment tab 'Models'
//     //Changes KPI values based on duration selected
//     modelsChange(myEvent) {
//       //Create popover displaying time choices
//       let popover = this.popCtrl.create(Models);
//         popover.onDidDismiss(data => {
//           //Default to 'All Models'
//           if(data == null) {
//             return this.selectedModel = 'All Models';
//           }
//           //Generate new KPI values
//           // this.randomKpiValues();
//           //Assign selected days
//           this.selectedModel = data;
//         });
//       popover.present({
//         ev: myEvent
//       });
//     };

//     //Segment tab 'campaigns'
//     //Changes KPI values based on duration selected
//     campaignsChange(myEvent) {
//       //Create popover displaying time choices
//       let popover = this.popCtrl.create(Campaigns);
//         popover.onDidDismiss(data => {
//           //Default to 'All Campaigns'
//           if(data == null) {
//             return this.selectedCampaign = 'All Campaigns';
//           }
//           //Generate new KPI values
//           // this.randomKpiValues();
//           //Assign selected campaign
//           this.selectedCampaign = data;
//         });
//       popover.present({
//         ev: myEvent
//       });
//     }

//     //Segment tab 'Status'
//     //Changes KPI values based on duration selected
//     statusChange(myEvent) {
//       //Create popover displaying time choices
//       let popover = this.popCtrl.create(Status);
//       popover.onDidDismiss(data => {
//         if(data == null) {
//           return this.selectedStatus = 'Any Status';
//         }
//         //Assign selected status
//         this.selectedStatus = data;
//         console.log(this.selectedStatus);
//       });
//       popover.present({
//         ev: myEvent
//       });
//     }

//     //Add New Tab will take user to MarketPage
//     addNew(e) {
//       this.navCtrl.setRoot(Market);
//     };

}
