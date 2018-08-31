import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';



@Component({
  selector: 'time-dropdown',
  templateUrl: 'time-dropdown.html'
})
export class TimeDropdown {


  constructor(public viewCtrl: ViewController, public params: NavParams) {
    console.log('Hello TimeDropdown Component');
  }

  close(days:string) {
    let data = days;
    this.viewCtrl.dismiss(data);
  }

}


