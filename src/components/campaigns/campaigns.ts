import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'campaigns',
  templateUrl: 'campaigns.html'
})
export class Campaigns {


  constructor(public viewCtrl: ViewController, public params: NavParams) {
  }

  close(days:string) {
    this.viewCtrl.dismiss(days);
  }

}
