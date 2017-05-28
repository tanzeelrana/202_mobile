import * as AWS from 'aws-sdk';
import { AlertsService } from '../providers/alerts-service';
import { ModalService } from '../providers/modal-service';

class AppConfig {

	private logLevel;
	private osrm;

	constructor(

	) {
		this.osrm = {
			"serverURL": "http://osrm.tanzeelrana.me/nominatim/"
		};
	}

	public initAWS(){
		console.log("initAWS");
		AWS.config.update({
	        accessKeyId: "YOUR_ACCESS_KEY",
	        secretAccessKey: "YOUR_SECRET_KEY",
	        "region": "REGION" 
	    });
	};

	private setLogLevel(logLevel){
		this.logLevel = logLevel;
	}

	public getLogLevel(){
		return this.logLevel;
	}

	

	public getOSRMData(){
		return this.osrm;
	}
}

export let config = new AppConfig();
