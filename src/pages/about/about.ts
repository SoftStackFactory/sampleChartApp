import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {
  video: any = '../../assets/video/tutorial.mp4';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tutorial');
    console.log(this.video);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
