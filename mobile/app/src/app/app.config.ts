// import * as AWS from 'aws-sdk';
// import { AlertsService } from '../providers/alerts-service';
// import { ModalService } from '../providers/modal-service';

class AppConfig {

	public logLevel;
    public osrm;
    public backend: any = {
        type: "parse",
        BACKEND_URL: 'http://162.243.118.87:1340/parse',
        BACKEND_APPLICATION_ID:"202_app_id",
        BACKEND_REST_API_KEY: "202_rest_id",
        BACKEND_MASTER_KEY: ""
    }
    
	constructor(

	) {
		this.osrm = {
			"serverURL": "http://osrm.tanzeelrana.me/nominatim/"
		};
	}

	// public initAWS(){
	// 	console.log("initAWS");
	// 	AWS.config.update({
	//         accessKeyId: "AKIAIHOWY5QSYNLZRAKA",
	//         secretAccessKey: "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",
	//         "region": "us-west-2"
	//     });
	// };
}

export let config = new AppConfig();
