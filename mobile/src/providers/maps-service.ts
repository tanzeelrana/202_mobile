import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
import L from "leaflet";
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

  search(query, format){	
  	return new Promise((resolve, reject) => {
      
      if(query==undefined || query==null || query==""){reject("invalid query")}
  		
      let me = this;
  		query = query.replace(/ /g , "+");
      console.log("query : " + query);
  		let url = me.serverURL + "search.php?format="+format+"&q=" + query + "&polygon_geojson=1&viewbox=";
  		console.log("url : " + url);
      me.http.get(url).map(res => res.json())
          .subscribe(data => {
            resolve(data);
          },
          err => {
              reject(err);
          });
  	});
	
  }
}
