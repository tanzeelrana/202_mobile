import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';

// Page Imports

import { MapsTab } from '../pages/maps-tab/maps-tab';
import { MapsTabRoute } from '../pages/maps-tab-route/maps-tab-route';
import { MapsTabSearch } from '../pages/maps-tab-search/maps-tab-search';
import { MapsTabSearchGoogle } from '../pages/maps-tab-search-google/maps-tab-search-google';
import { Tabs } from '../pages/tabs/tabs';
import { Home } from '../pages/home/home';
import { Contact } from '../pages/contact/contact';
import { About } from '../pages/about/about';
import { Account } from '../pages/account/account';
import { Settings } from '../pages/settings/settings';
import { AwsGeospatialPage } from '../pages/aws-geospatial/aws-geospatial';

// Provider Imports

import { AuthService } from '../providers/auth-service';
import { MapsService } from '../providers/maps-service';
import { AlertsService } from '../providers/alerts-service';
import { ModalService } from '../providers/modal-service';
import { ConnectivityService } from '../providers/connectivity-service';
import { OpenStreetMapsService } from '../providers/open-street-maps-service';
import { GoogleMapsService } from '../providers/google-maps-service';
import { AwsGeoProvider } from '../providers/aws-geo/aws-geo';
import { AwsCognitoProvider } from '../providers/aws-cognito/aws-cognito';

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
    MapsTabSearch,
    MapsTabSearchGoogle,
    AwsGeospatialPage
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
    MapsTabSearch,
    MapsTabSearchGoogle,
    AwsGeospatialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MapsService,
    Geolocation,
    Network,
    AlertsService,
    ModalService,
    ConnectivityService,
    OpenStreetMapsService,
    GoogleMapsService,
    AwsGeoProvider,
    AwsCognitoProvider
  ]
})
export class AppModule {}
