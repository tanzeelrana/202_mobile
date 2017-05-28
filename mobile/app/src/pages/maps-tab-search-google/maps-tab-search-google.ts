import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { MapsService } from '../../providers/maps-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { AlertsService } from '../../providers/alerts-service';
import { ConnectivityService } from '../../providers/connectivity-service';

/**
 * Generated class for the MapsTabSearchGoogle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-maps-tab-search-google',
  templateUrl: 'maps-tab-search-google.html',
})
export class MapsTabSearchGoogle {

	private mapsServiceProvider: String = "google";
	private searchBarPlaceHolder: String = "Enter Address";
	private addressQuery: String;
	private shouldShowCancel: Boolean = true;
	private showSearchSpinner: Boolean = false;
	private loadingLocationDetails: Boolean = false;
	private showLocationDetails: Boolean = false;
	private currentLocationDetails: Object = {};

	private mapElement = document.getElementById('googlemap');
	private googlemap: any;
	private mapInitialised: boolean = false;

	constructor(
		public nav: NavController, 
		public connectivityService: ConnectivityService,
		public mapsService: MapsService,
		private network: Network,
		public navParams: NavParams,
		public alertsService: AlertsService,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
	) {
		console.log("MapsTabSearchGoogle");
	}

	ionViewDidLoad() {
		this.mapElement = document.getElementById('googlemap');
		this.initMap();
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

	initMap(){
		let me = this;
		me.mapInitialised = true;
		me.mapsService.getCurrentLocationGeoPoint().then((position)=>{
		    let latLng = new google.maps.LatLng(position[0], position[1]);
		    let mapOptions = {
		      center: latLng,
		      zoom: 15,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    }
		    me.mapsService.reverseSearchAddress(position[0],position[1], me.mapsServiceProvider).then((results)=>{
		    	me.googlemap = new google.maps.Map(me.mapElement, mapOptions);
		    	me.addMarker(position, results[0]);
		    }).catch((error)=>{
		    	console.error(error);
		    });
		});
	}

  	addMarker(position, place){
	  let marker = new google.maps.Marker({
	    map: this.googlemap,
	    animation: google.maps.Animation.DROP,
	    position: this.googlemap.getCenter()
	  });         
	  this.addInfoWindow(marker, place);
	}

	addInfoWindow(marker, place){
	  let infoWindow = new google.maps.InfoWindow({
	    content: place['formatted_address']
	  });
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.googlemap, marker);
	  });
	}

	searchAddress(){
		let me = this;
		me.showSearchSpinner = !me.showSearchSpinner;
		console.log(me.addressQuery);
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
				(<any> prompt).present();
			});
		}).catch((error)=>{
			console.error(error);
			me.showSearchSpinner = !me.showSearchSpinner;
		});
	}

}
