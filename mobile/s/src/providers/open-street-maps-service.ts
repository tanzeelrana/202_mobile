import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import L from "leaflet";
import * as AWS from 'aws-sdk';
import * as appConfig from '../app/app.config';
import { AlertsService } from './alerts-service';
import { ModalService } from './modal-service';

/*
  Generated class for the OpenStreetMapsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OpenStreetMapsService {

	private serverURL;
 	private watch;
  	private currentPosition: L.PointTuple;

	constructor(
		public http: Http,
	    private geolocation: Geolocation,
	    private alertsService: AlertsService,
	    private modalService: ModalService
	) {
		console.log('Hello OpenStreetMapsService Provider');
		this.serverURL = appConfig.config.getOSRMData()['serverURL'];
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
	          let dataAsJSON = JSON.parse(JSON.stringify(data));
	          dataAsJSON.Payload = JSON.parse(dataAsJSON["Payload"]);
	          resolve(dataAsJSON);
	        }    
	      });
	    });
	}

	getAddressSelectPrompt(promptType, data, callbacks){
		let inputs = [];
		for (let address of data.Payload) {
		  inputs.push({
		    type: 'radio',
		    label: address.display_name,
		    value: address,
		    checked: true
		  });
		}

		let addressPromptData = {
		  "title": "Confirm Address",
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
