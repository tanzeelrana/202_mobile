import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AwsGeoProvider } from '../../providers/aws-geo/aws-geo';
import { MapsService } from '../../providers/maps-service';

declare var google;

/**
 * Generated class for the AwsGeospatialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-aws-geospatial',
  templateUrl: 'aws-geospatial.html',
})
export class AwsGeospatialPage {

  // 700 km
  radius: any = 700000;
  
  // Islamabad 33.7294° N, 73.0931° E
  // latitude: any = 33.7294;
  // longitude: any = 73.0931;

  // Lahore 31.5546° N, 74.3572° E
  latitude: any = 31.5546;
  longitude: any = 74.3572;

  mapElement;
  googlemap: any;
  mapInitialised: boolean = false;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public awsGeo: AwsGeoProvider,
    public mapsService: MapsService
  ) {
  	console.log("Hello AwsGeospatialPage Service Provider");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsGeospatialPage');
    this.initMap();        
  }

  initMap(){
    this.mapElement = document.getElementById('googlemap-aws');
    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    this.googlemap = new google.maps.Map(this.mapElement, this.mapsService.getDefaultMapOptions(latLng, 8));
  }

  radiusQuery(){
    console.log("Radius : " + this.radius + " lat: " + this.latitude + " lng: " + this.longitude);
  }

  createTable(){
  	this.awsGeo.createTable();
  }

  deleteTable(){
  	this.awsGeo.cleanUp().then((data)=>{
  		console.log(data);
  	}).catch((error)=>{
  		console.log(error);
  	});
  }

}
