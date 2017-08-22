import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MapsProvider {

  constructor(
    public http: Http,
    public platform: Platform,
    private geolocation: Geolocation
  ) {
    console.log('Hello MapsProvider Provider');
  }

  startExternalMap(address) {
      
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
        if (this.platform.is('ios')) {
          window.open('maps://?q=' + address, '_system');
        };
        // android
        if (this.platform.is('android')) {
          window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + address, '_system');
        };
      }).catch((error) => {
        console.error('Error getting location', error);
      });
      
    });
  }
}
