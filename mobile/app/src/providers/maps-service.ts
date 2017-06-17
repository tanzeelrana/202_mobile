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

declare var google;

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

  initMap(mapInitialised, position, mapsServiceProvider, mapElement, gMap, zoom){
    return new Promise((resolve, reject) => {
      let me = this;
      mapInitialised = true;
      
      let latLng = new google.maps.LatLng(position[0], position[1]);
      let mapOptions = {
        center: latLng,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      me.reverseSearchAddress(position[0],position[1], mapsServiceProvider).then((results)=>{
        gMap = new google.maps.Map(mapElement, mapOptions);
        me.addMarker(position, results[0], gMap).then((m)=>{
          resolve(m);
        }).catch((error)=>{
          reject(error);
        });
      }).catch((error)=>{
        console.error(error);
        reject(error);
      });
    });
  }

  getDefaultMapOptions(latLng, zoom){
     return {
        center: latLng,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  }

  getLatLng(position){
    var latLng = new google.maps.LatLng(position[0], position[1]);
    return latLng;
  }

  addMarker(position, place, gMap){
    return new Promise((resolve, reject) => {
      let marker = new google.maps.Marker({
        map: gMap,
        animation: google.maps.Animation.DROP,
        position: gMap.getCenter()
      });         
      this.addInfoWindow(marker, place, gMap).then((m)=>{
        resolve(m);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  addInfoWindow(marker, place, gMap){
    return new Promise((resolve, reject) => {
      let infoWindow = new google.maps.InfoWindow({
        content: place['formatted_address']
      });
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(gMap, marker);
      });
      resolve(gMap);
    });
  }

}
