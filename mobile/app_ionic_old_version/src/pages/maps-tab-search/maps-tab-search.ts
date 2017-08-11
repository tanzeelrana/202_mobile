import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsService } from '../../providers/maps-service';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertsService } from '../../providers/alerts-service';
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

	private mapsServiceProvider: String = "osrm";
	private searchBarPlaceHolder: String = "Enter Address";
	private addressQuery: String;
	private shouldShowCancel: Boolean = true;
	private showSearchSpinner: Boolean = false;
	private loadingLocationDetails: Boolean = false;
	private showLocationDetails: Boolean = false;
	private currentLocationDetails: Object = {};

	map: L.Map;
	center: L.PointTuple;
	
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public mapsService: MapsService,
		public alertsService: AlertsService
	) {
		console.log("MapsTabSearchOSRM");
	}

	ionViewDidLoad() {
		let me = this;
		me.mapsService.getCurrentLocationGeoPoint().then((position)=>{
			me.center = (<L.PointTuple> position);
			me.reverseSearchAddress(me.center[0],me.center[1]);
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

	onInput(event){
		console.log(event);
	}

	onCancel(event){
		console.log(event);
	}

	onShowLocationDetails(){
		this.showLocationDetails = !this.showLocationDetails;
	}

	searchAddress(){
		let me = this;
		me.showSearchSpinner = !me.showSearchSpinner;
		me.mapsService.searchAddress(me.addressQuery, me.mapsServiceProvider).then((data)=>{
			me.showSearchSpinner = !me.showSearchSpinner;
			let callbacks = {
				moreHandler: data => {
	            	console.log(data + ' clicked');
	          	},
	          	confirmHandler: data => {
	            	console.log(data + ' clicked');
	          	},
			};
			me.mapsService.getAddressSelectPrompt('alert', data, callbacks, me.mapsServiceProvider).then((prompt)=>{
				( <any> prompt).present();
			});
		}).catch((error)=>{
			me.showSearchSpinner = !me.showSearchSpinner;
		});
	}

	// initially load users current location on the map 
	reverseSearchAddress(lat,lon){
		let me = this;
		me.loadingLocationDetails = !me.loadingLocationDetails;
		me.mapsService.reverseSearchAddress(lat,lon, me.mapsServiceProvider).then((data)=>{
			me.currentLocationDetails = data["Payload"];
			me.loadingLocationDetails = !me.loadingLocationDetails;
		}).catch((error)=>{
			me.loadingLocationDetails = !me.loadingLocationDetails;
		});
	}
}
