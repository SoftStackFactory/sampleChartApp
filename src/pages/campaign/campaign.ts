import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-campaign',
  templateUrl: 'campaign.html',
})
export class Campaign {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tutorial');
  }

  //Closes modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  // Displays toast
  showMore() {
    let toast = this.toastCtrl.create({
      message: 'Campaign Created!!',
      duration: 2000,
      position: 'middle'
    });
    toast.present(toast);
    this.dismiss();
  }

}
