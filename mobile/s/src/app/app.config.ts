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
	        accessKeyId: "AKIAIHOWY5QSYNLZRAKA",
	        secretAccessKey: "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",
	        "region": "us-west-2" 
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