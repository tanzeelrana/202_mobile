import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { MapsService } from '../../providers/maps-service';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertsService } from '../../providers/alerts-service';
// import { LoggerService } from '../../providers/logger-service';

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
	private loadingLocationDetails: Boolean = false;
	private showLocationDetails: Boolean = false;
	private currentLocationDetails: Object = {};

	map: L.Map;
	center: L.PointTuple;
	public promptObj = {};

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public mapsService: MapsService,
		public alertsService: AlertsService,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
		// private logger: LoggerService
		
	) {
		this.promptObj['alertCtrl'] = this.alertCtrl;
		this.promptObj['modalCtrl'] = this.modalCtrl;
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
		me.mapsService.searchAddress(me.addressQuery).then((data)=>{
			// me.logger.log.debug(data);
			me.showSearchSpinner = !me.showSearchSpinner;
			let alert = me.mapsService.getPromptForSearch(me.promptObj, data, {
				moreHandler: data => {
	            	console.log(data + ' clicked');
	          	},
	          	confirmHandler: data => {
	            	console.log(data + ' clicked');
	          	},
			});

			alert.present();
		}).catch((error)=>{
			me.showSearchSpinner = !me.showSearchSpinner;
		});
	}

	// initially load users current location on the map 
	reverseSearchAddress(lat,lon){
		let me = this;
		me.loadingLocationDetails = !me.loadingLocationDetails;
		me.mapsService.reverseSearchAddress(lat,lon).then((data)=>{
			me.currentLocationDetails = data["Payload"];
			me.loadingLocationDetails = !me.loadingLocationDetails;
		}).catch((error)=>{
			me.loadingLocationDetails = !me.loadingLocationDetails;
		});
	}
}
