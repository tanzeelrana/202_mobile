import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapsService } from '../../providers/maps-service';
import { Geolocation } from '@ionic-native/geolocation';
import L from "leaflet";

/**
 * Generated class for the MapsTabSearch page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-maps-tab-search',
  templateUrl: 'maps-tab-search.html',
})
export class MapsTabSearch {

	private searchBarPlaceHolder: String = "Enter Address";
	private addressQuery: String;
	private shouldShowCancel: Boolean = true;
	private showSearchSpinner: Boolean = false;

	map: L.Map;
	center: L.PointTuple;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public mapsService: MapsService
	) {}

	ionViewDidLoad() {
		let me = this;
		me.mapsService.getCurrentLocationGeoPoint().then((position)=>{
			me.center = (<L.PointTuple> position);
			console.log(me.center);
			me.initMap();
		}).catch((error)=>{
			console.error(error);
		});
		
	}

	initMap() {
		let me = this;
		me.map = L.map('map', {
		  center: me.center,
		  zoom: 13
		});
		L.marker(me.center).addTo(me.map);
		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
		  .addTo(me.map);
	}

	// ionViewDidLoad() {
 //    console.log('ionViewDidLoad MapPage');

 //    //set map center
 //    //this.center = [48.137154, 11.576124]; //Munich
 //    this.center = [48.775556, 9.182778]; //Stuttgart
    
 //    //setup leaflet map
 //    this.initMap();
 //  }

 //  initMap() {
 //    this.map = L.map('map', {
 //      center: this.center,
 //      zoom: 13
 //    });

 //    //Add OSM Layer
 //    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
 //      .addTo(this.map);
 //  }

	onInput(event){
		console.log(event);
	}

	onCancel(event){
		console.log(event);
	}

	searchAddress(){
		let me = this;
		me.mapsService.getCurrentLocationGeoPoint();
		me.showSearchSpinner = !me.showSearchSpinner;
		console.log("search address : " + me.addressQuery);
		me.mapsService.search(me.addressQuery,'json').then((data)=>{
			console.log(data);
			me.showSearchSpinner = !me.showSearchSpinner;
		}).catch((error)=>{
			me.showSearchSpinner = !me.showSearchSpinner;
		});

	}
}
