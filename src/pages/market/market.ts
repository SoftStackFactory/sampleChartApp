
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, PopoverController, ModalController } from 'ionic-angular';
//Pages
import { Campaign } from './../campaign/campaign';
//Components
import { MarketDropdown } from '../../components/market-dropdown/market-dropdown';
//Providers
import { DataService } from '../../providers/data-service';

import * as d3 from 'd3';


@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class Market {
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('bubbleCanvas') bubbleCanvas;


  firmographicList: string[] = [];
  //Variable to hold Insight Sentence
  insightsList: string[];
//variables to set the number for revenue and employee count
  odd = 1;
  even = 2;
  bar: string = "bar"
  doughnut: string = "doughnut"
  tappedPopData: number[] = []
  c1: string = "asdf";
  names: string[] = ["1", "2", "3"]

  //Data for firmographic charts
  employeeBarData = { title: "Employee Count" , labels: ["<10", "50-99", "100-249", "250-499", "500-999", "1000-4999", "5000-9999", "10000-19999", ">20000"], xLabel: "Headcount Bin", yLabel: "Fraction of Customers" }
  revenueBarData = { title: "Revenue", labels: ["0-500k", "500K-1M", "1M-2.5 M", "2.5M-5M", "5M-10M", "10M -50M", "50M-100M", "100M-500M", "500M - 1B","1 B+" ], xLabel: "Revenue Bin", yLabel: "Fraction of Customers" }
  
  // Default for segment dropdown
  selectedModel: string = 'All Customers';

  clusters: any[] = [];
  vectoralues = [];
  cat: string = "histogram";
  newVectorData: any;
  dimensions: object[];
  gaugeNum: number;
  revenueLabels = ["Headcount Bin", "Fraction of Customers"]

  //Current cluster that is displayed in the view
  activeCluster: object;
  exampleCompanies: string[] = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public popCtrl: PopoverController, public dataService: DataService, public toastCtrl: ToastController,
    public modalCtrl: ModalController) {


    this.dimensions = this.dataService.dimensions;

    //Get Dataset
    this.clusters = this.dataService.getDataset();
    //Subscribe to get updated clusters
    this.dataService.myObservable.subscribe((data) => {
      this.clusters = data;
      this.selectCluster(this.clusters[0]);
    });
    this.gaugeNum = this.navParams.get("selectedGauge") ? this.navParams.get("selectedGauge") : 0
    // Assign values from JSON
    this.newVectorData = this.dataService.clusters[0]["Company Vector Histogram"];
    this.activeCluster =  this.clusters[this.gaugeNum];
    this.getExampleCompanies(this.activeCluster["Exemplar List"]);
    this.setDoughnutData(this.activeCluster["Untapped Population"], this.activeCluster["Tapped Population"]);
    this.getFirmographicList();
    this.getinsightsList();
    console.log("gauge", this.gaugeNum)
  }


  //Modal for campaign creation
  openModal() {
    let modal = this.modalCtrl.create(Campaign);
    modal.present();
  }

  // Sets active cluster to be displayed on view, changes on click of clusters at top of page
  selectCluster(value) {
    this.activeCluster = value;
    this.exampleCompanies = [];
    this.getExampleCompanies(value["Exemplar List"]);
    this.setDoughnutData(value["Untapped Population"], value["Tapped Population"]);
    this.firmographicList = [];
    this.getFirmographicList();
    this.getinsightsList();
  }

  // Pass values to Doughnut Chart
  setDoughnutData(value1, value2) {
    this.tappedPopData = []
    this.tappedPopData.push(value1, value2)
  }

  //Retrieves example companies from dataService using the exmplar companies array ids
  getExampleCompanies(companyIds: string[]) {
    companyIds.forEach(id => {
      for (let i = 0; i < this.dataService.companies.length; i++) {
        if (id == this.dataService.companies[i]["Company ID"]) {
          this.exampleCompanies.push(this.dataService.companies[i]["Company Name"])
          return
        }
      }
    })
  }

  // Grab data for 'Insights'
  getinsightsList() {
    this.insightsList = [];
    for (let i = 0; i < this.activeCluster["Insights"].length; i++) {
      this.insightsList.push(this.activeCluster["Insights"][i]);
    }
  }

  // Grab data for 'Top Industries'
  getFirmographicList() {
    this.firmographicList = [];
    for (let i = 0; i < this.activeCluster["Top Industries"].length; i++) {
      this.firmographicList.push(this.activeCluster["Top Industries"][i]);
    }
  }

  //Function to create random numbers for cluster values
  rNum() {
    return Math.round(Math.random() * 100);
  }

  // For popover dropdown
  modelsChange(myEvent) {
    let popover = this.popCtrl.create(MarketDropdown);
    popover.onDidDismiss(data => {
      if (data == null) {
        return this.selectedModel = 'All Customers';
      }
      this.selectedModel = data;
    });
    popover.present({
      ev: myEvent
    });
  }

  // Displays toast for clickable items
  showMore() {
    let toast = this.toastCtrl.create({
      message: 'To Be Determined...',
      duration: 2000,
      position: 'middle'
    });
    toast.present(toast);
  }


}

