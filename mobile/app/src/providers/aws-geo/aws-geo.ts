import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UUID } from 'angular2-uuid';
import 'rxjs/add/operator/map';

import * as AWS from 'aws-sdk';
import * as data from './resources/capitals.json';

import { GeoDataManagerConfiguration } from './GeoDataManagerConfiguration';
import { GeoDataManager } from './GeoDataManager';
import { GeoTableUtil } from './util/GeoTableUtil';
/*
  Generated class for the AwsGeoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AwsGeoProvider {

	private ddb;
	private config;
	private capitalsManager;
	private createTableInput;
	private uuid = UUID.UUID();

	constructor(
		public http: Http
	) {

		console.log("capitals data : ");
		console.log(data);


		
		console.log('Hello AwsGeoProvider Provider');
		
		this.ddb = new AWS.DynamoDB();
		// Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
		this.config = new GeoDataManagerConfiguration(this.ddb, 'capitals');
		// Instantiate the table manager
		this.capitalsManager = new GeoDataManager(this.config);
		// Use GeoTableUtil to help construct a CreateTableInput.
		this.createTableInput = GeoTableUtil.getCreateTableRequest(this.config);
		// Tweak the schema as desired
		this.createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;
		this.createTableInput.ProvisionedThroughput.WriteCapacityUnits = 2;
	}

	createTable(){
		let me = this;
		console.log('Creating table with schema:');
		console.dir(me.createTableInput, { depth: null });

		me.ddb.createTable(me.createTableInput).promise()
		    // Wait for it to become ready
		    .then(function () { return me.ddb.waitFor('tableExists', { TableName: me.config.tableName }).promise() })
		    // Load sample data in batches
		    .then(function () {
		        console.log('Loading sample data from capitals.json');
		        // const data = require('./resources/capitals.json');
		        const putPointInputs = data.map(function (capital) {
		            return {
		                RangeKeyValue: { S: me.uuid }, // Use this to ensure uniqueness of the hash/range pairs.
		                GeoPoint: {
		                    latitude: capital.latitude,
		                    longitude: capital.longitude
		                },
		                PutItemInput: {
		                    Item: {
		                        country: { S: capital.country },
		                        capital: { S: capital.capital }
		                    }
		                }
		            }
		        });

		        const BATCH_SIZE = 25;
		        const WAIT_BETWEEN_BATCHES_MS = 1000;
		        var currentBatch = 1;

		        function resumeWriting() {
		            if (putPointInputs.length === 0) {
		                return Promise.resolve();
		            }
		            const thisBatch = [];
		            for (var i = 0, itemToAdd = null; i < BATCH_SIZE && (itemToAdd = putPointInputs.shift()); i++) {
		                thisBatch.push(itemToAdd);
		            }
		            console.log('Writing batch ' + (currentBatch++) + '/' + Math.ceil(data.length / BATCH_SIZE));
		            return me.capitalsManager.batchWritePoints(thisBatch).promise()
		                .then(function () {
		                    return new Promise(function (resolve) {
		                        setInterval(resolve,WAIT_BETWEEN_BATCHES_MS);
		                    });
		                })
		                .then(function () {
		                    return resumeWriting()
		                });
		        }

		        return resumeWriting().catch(function (error) {
		            console.warn(error);
		        });
		    })

		    // Perform a radius query
		    .then(function () {
		        console.log('Querying by radius, looking 100km from Cambridge, UK.');
		        return me.capitalsManager.queryRadius({
		            RadiusInMeter: 100000,
		            CenterPoint: {
		                latitude: 52.225730,
		                longitude: 0.149593
		            }
		        })
		    })
		    
		    // Print the results, an array of DynamoDB.AttributeMaps
		    .then(console.log);
		//     // Clean up
		//     .then(function() { return me.ddb.deleteTable({ TableName: me.config.tableName }).promise() })
		//     .catch(console.warn)
		//     .then(function () {
		//         process.exit(0);
		// });
	}

	/* 

		Perform a radius query

		@params : 

			radiusInMeter :  radius in meters
			centerPoint : json object around which the query is made 
			{
				latitude : LAT_VALUE
				longitude" LNG_VALUE
			}

		@return : return an array with all the points found in the database
		
	*/
	
	radiusQuery(radiusInMeter, centerPoint){
		let me = this;
		return new Promise((resolve, reject) => {
			me.capitalsManager.queryRadius({
				RadiusInMeter: radiusInMeter,
				CenterPoint: centerPoint
			}).then((data)=>{
				resolve(data);
			}).catch((error)=>{
				reject(error);
			});
		});
	}

	/* 
		Clean up

	*/

	cleanUp(){
		let me = this;
		return new Promise((resolve, reject) => {
			me.ddb.deleteTable({ TableName: me.config.tableName }).promise().then((data)=>{
				resolve(data);
			}).catch((error)=>{
				reject(error);
			});
		});
	}

}
