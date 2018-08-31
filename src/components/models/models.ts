import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'models',
  templateUrl: 'models.html'
})
export class Models {


  constructor(public viewCtrl: ViewController, public params: NavParams) {
  }

  close(days:string) {
    this.viewCtrl.dismiss(days);
  }

}
