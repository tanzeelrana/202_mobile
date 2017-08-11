import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertsService } from './alerts-service';
import { ModalService } from './modal-service';

declare var google;

/*
  Generated class for the GoogleMapsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleMapsService {

	private geocoder = new google.maps.Geocoder;

	constructor(public http: Http) {
		console.log('Hello GoogleMapsService Provider');
	}

	reverseSearchAddress(lat, lng){	
		return new Promise((resolve, reject) => {
	      this.geocoder.geocode({'location': {lat: lat, lng: lng}}, function(results, status) {
	        if (status === 'OK') {
	          if (results[1]) {
	            resolve(results);
	          } else {
	            reject('No results found');
	          }
	        } else {
	          reject('Geocoder failed due to: ' + status);
	        }
	      });
	    });   
	}

	searchAddress(address){
	    return new Promise((resolve, reject) => {
	      this.geocoder.geocode({'address': address}, function(results, status) {
	        if (status === 'OK') {
	          if (results[0]) {
	            resolve(results);
	          } else {
	            reject('No results found');
	          }
	        } else {
	          reject('Geocoder failed due to: ' + status);
	        }
	      });
	    });
	}

	getAddressSelectPrompt(promptType, data, callbacks){
		let inputs = [];
		for (let address of data) {
		  inputs.push({
		    type: 'radio',
		    label: address.display_name,
		    value: address,
		    checked: true
		  });
		}

		let addressPromptData = {
		  "title": "Confirm Address",
		  // "message": data.display_name,
		  "inputs": inputs,
		  buttons: [
		    {
		      text: 'More',
		      handler: () => {
		        callbacks.moreHandler({data: data})
		      }
		    },
		    {
		      text: 'Confirm',
		      handler: () => {
		        callbacks.confirmHandler({data: data});
		      }
		    }
		  ]
		}
		return addressPromptData;
	}

}
