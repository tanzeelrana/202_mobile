import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
import L from "leaflet";

import * as AWS from 'aws-sdk';

/*
  Generated class for the Maps provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapsService {

  private serverURL = "http://osrm.tanzeelrana.me/nominatim/";
  private watch;
  private currentPosition: L.PointTuple;

  constructor(
  	public http: Http,
    private geolocation: Geolocation
  ) {
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

  // watchPosition(){
  //   let me = this;
  //   me.watch = me.geolocation.watchPosition();
  //   me.watch.subscribe((data) => {
  //     me.currentPosition = [data.coords.latitude, data.coords.longitude];
  //   });
  // }

  stopWatchPosition(){
    let me = this;
    me.watch.unsubscribe();
  }

  searchAddress(address){	
    return new Promise((resolve, reject) => {
      let me = this;
      if(address==undefined || address==null || address==""){reject("invalid query")}
      let query = address.replace(/ /g , "+");
      let url = "search.php?format=json&q=" + query + "&limit=100&polygon_geojson=1&viewbox=";
      let payload = { 
                url: url
          }
      me.addressSearchAWSLambda(payload).then((data)=>{
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
  	});
	
  }

  reverseSearchAddress(lat,lon){
    return new Promise((resolve, reject) => {
      let me = this;
      let url = "reverse.php?format=json&lat="+lat+"&lon="+lon+"&zoom=18&addressdetails=1";
      let payload = { 
                url: url
      }
      me.addressSearchAWSLambda(payload).then((data)=>{
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  private addressSearchAWSLambda(payload): any{
    return new Promise((resolve, reject) => {
      var lambda = new AWS.Lambda();
      var params = {
      FunctionName: 'addressSearch',
          Payload: JSON.stringify(payload)
      };

      lambda.invoke(params, function(err, data) {
        if (err) reject(err);    // an error occurred
        else {    
            resolve(data);
        }    
      });
    });
  }
}
