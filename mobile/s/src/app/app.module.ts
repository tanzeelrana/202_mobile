import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';

import { MapsTab } from '../pages/maps-tab/maps-tab';
import { MapsTabRoute } from '../pages/maps-tab-route/maps-tab-route';
import { MapsTabSearch } from '../pages/maps-tab-search/maps-tab-search';

import { Tabs } from '../pages/tabs/tabs';
import { Home } from '../pages/home/home';
import { Contact } from '../pages/contact/contact';
import { About } from '../pages/about/about';

import { Account } from '../pages/account/account';
import { Settings } from '../pages/settings/settings';

import { AuthService } from '../providers/auth-service';
import { MapsService } from '../providers/maps-service';


@NgModule({
  declarations: [
    MyApp,
    Tabs,
    Account,
    Settings,
    Home,
    Contact,
    About,
    MapsTab,
    MapsTabRoute,
    MapsTabSearch
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Tabs,
    Account,
    Settings,
    Home,
    Contact,
    About,
    MapsTab,
    MapsTabRoute,
    MapsTabSearch
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MapsService,
    Geolocation
  ]
})
export class AppModule {}
