import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OpenStreetMapsService } from './open-street-maps-service';
import { GoogleMapsService } from './google-maps-service';
import { AlertsService } from './alerts-service';
import { ModalService } from './modal-service';
import { Geolocation } from '@ionic-native/geolocation';
import * as appConfig from '../app/app.config';
import L from "leaflet";

/*
  Generated class for the Maps provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class MapsService {

  private watch;
  private currentPosition: L.PointTuple;
  private mapsServices: any;
  private promptServices: any;
  
  constructor(
  	public http: Http,
    private geolocation: Geolocation,
    private openStreetMapsService: OpenStreetMapsService,
    private googleMapsService: GoogleMapsService,
    private alertsService: AlertsService,
    private modalService: ModalService 
  ) {
    this.promptServices = {"alert": alertsService, "modal": modalService};
    this.mapsServices = {"osrm": this.openStreetMapsService, "google": this.googleMapsService};;
    // this.watchPosition();
  }

  getCurrentLocationGeoPoint(){
    let me = this;
    return new Promise((resolve, reject) => {
      me.geolocation.getCurrentPosition().then((resp) => {
       me.currentPosition = [resp.coords.latitude, resp.coords.longitude];
       console.log(me.currentPosition);
       resolve(me.currentPosition);
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  watchPosition(){
    let me = this;
    me.watch = me.geolocation.watchPosition();
    me.watch.subscribe((data) => {
      me.currentPosition = [data.coords.latitude, data.coords.longitude];
    });
  }

  stopWatchPosition(){
    let me = this;
    me.watch.unsubscribe();
  }

  searchAddress(address, provider){
    let me = this;
    return new Promise((resolve, reject) => {
      this.mapsServices[provider].searchAddress(address).then((data)=>{
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  reverseSearchAddress(lat,lon, provider){
    let me = this;
    return new Promise((resolve, reject) => {
      me.mapsServices[provider].reverseSearchAddress(lat,lon).then((data)=>{
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  getAddressSelectPrompt(promptType, data, callbacks, provider){
    let me = this;
    let promptData = me.mapsServices[provider].getAddressSelectPrompt(promptType, data, callbacks);
    let prompt = me.promptServices[promptType].getPrompt(promptData);
    return prompt;
  }

}
