import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MarketDropdown component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'market-dropdown',
  templateUrl: 'market-dropdown.html'
})
export class MarketDropdown {


  constructor(public viewCtrl: ViewController, public params: NavParams) {
  }

  close(days:string) {
    this.viewCtrl.dismiss(days);
  }

}
