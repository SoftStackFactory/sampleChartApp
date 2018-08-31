import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Funnel } from '../pages/funnel/funnel';
import { HomePage } from '../pages/home/home';
import { Market } from '../pages/market/market';
import { About } from '../pages/about/about';
//Providers
import { DataService } from '../providers/data-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  //rootPage: any =  Market;

  activePage: string;

  pages: Array<{ title: string, component: any, icon: string }>;
  users: Object;

  selectedUser: string = 'User 1';
  hideDataset: boolean = true;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    public dataService: DataService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: HomePage, icon: 'calendar' },
      { title: 'Market Segmentation', component: Market, icon: 'calendar' }
      // { title: "Funnel", component: Funnel, icon: 'calendar' }
    ];
    this.activePage = this.pages[0].title
    //Grab Users from json
    this.users = this.dataService.getUsers();

    //Populate default dataset with clientId: C0000001
    this.dataService.setDataset('C0000001');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setActivePage(page: string) {
    this.activePage = page;
  }

  openPage(page) {
    this.activePage = page.title
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
   console.log(page, this.activePage)
  }

  goToPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //Modal showing videos
  openModal(page) {
    let modal = this.modalCtrl.create(page.component);
    modal.present();
  }

  //Changes boolean on click to show/hide users list
  showDatasets() {
    this.hideDataset = (this.hideDataset == true) ? false : true;
  }

  //Selects and sets user dataset
  selectDataset(data: any) {
    this.selectedUser = data.name;
    this.dataService.setDataset(data.value);
  }

}
