import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import Data from '../assets/data/data';



@Injectable()
export class DataService {
  dimensions: object[];
  clusters: object[];
  companies: object[];
  data: object[];
  selectedDataset: object[];
  myObservable: Subject<any> = new Subject();
  users: object[];


  constructor() {

    this.dimensions = Data.dimensions;
    this.clusters = Data.clusters;
    this.companies = Data.companies;
    this.users = Data.users;

    for (let i = 0; i < this.clusters.length; i++) {
      this.clusters[i]['Company Vector Median']
      for (let t = 0; t < this.clusters[i]['Company Vector Median'].length; t++) {
        this.clusters[i]['Company Vector Median'][t] = this.clusters[i]['Company Vector Median'][t] * 10;
      }
    }

  }


  //Assigns selected dataset to selectedDataset
  setDataset(clientId: string) {
    this.selectedDataset = [];
    for (let i = 0; i < this.clusters.length; i++) {
      if (this.clusters[i]["Client ID"] == clientId) {
        this.selectedDataset.push(this.clusters[i]);
      }
    }
    this.myObservable.next(this.selectedDataset);
  }

  //Returns selectedDataset
  getDataset() {
    return this.selectedDataset;
  }

  getData() {
    return this.myObservable;
  }

  //Returns Users
  getUsers(){
    return this.users;
  }


}
