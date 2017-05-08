import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Tabs } from '../pages/tabs/tabs';
import { MapsTab } from '../pages/maps-tab/maps-tab';
import { Settings } from '../pages/settings/settings';
import { Account } from '../pages/account/account';

import *  as AppConfig from './app.config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = MapsTab;

  pages: Array<{title: string, component: any}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Maps', component: MapsTab },
      { title: 'Tabs', component: Tabs },
      { title: 'Settings', component: Settings },
      { title: 'Account', component: Account }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

