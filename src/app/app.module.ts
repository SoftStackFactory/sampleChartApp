import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';
import { ChartsModule } from 'ng2-charts';

// Pages
import { HomePage } from '../pages/home/home';
import { Market } from '../pages/market/market';
import { Campaign } from '../pages/campaign/campaign';
import { About } from '../pages/about/about';

// Providers
import { FillGauge } from '../providers/fill-gauge';
import { DataService } from '../providers/data-service';

// components
import { TimeDropdown } from '../components/time-dropdown/time-dropdown';
import { Models } from '../components/models/models';
import { Status } from '../components/status/status';
import { Campaigns } from '../components/campaigns/campaigns';
import { Histogram } from '../components/histogram/histogram';
import { MarketDropdown } from '../components/market-dropdown/market-dropdown';
import { BarChart } from '../components/bar-chart/bar-chart';
import { DoughnutChart } from '../components/doughnut-chart/doughnut-chart';
import { Gauge} from '../components/classes/gauge';
import { DynamicChartComponent } from '../components/dynamic-chart/dynamic-chart';

let injections = [
    MyApp,
    HomePage,
    Market,
    Campaign,
    About,
    TimeDropdown,
    Models,
    Status,
    Campaigns,
    Histogram,
    MarketDropdown,
    BarChart,
    DoughnutChart,
    DynamicChartComponent

  ]

@NgModule({
  declarations: injections ,
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: injections,
  providers: [
    StatusBar,
    SplashScreen,
    FillGauge,
    DataService,
    Gauge,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
