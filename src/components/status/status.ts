import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'status',
  templateUrl: 'status.html'
})
export class Status {


  constructor(public viewCtrl: ViewController, public params: NavParams) {
    console.log('Hello Status Component');
  }

  close(days:string) {
    this.viewCtrl.dismiss(days);
  }

}
