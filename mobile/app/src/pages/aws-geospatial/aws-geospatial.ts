import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AwsGeoProvider } from '../../providers/aws-geo/aws-geo';


/**
 * Generated class for the AwsGeospatialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-aws-geospatial',
  templateUrl: 'aws-geospatial.html',
})
export class AwsGeospatialPage {

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public awsGeo: AwsGeoProvider
  ) {
  	console.log("Hello AwsGeospatialPage Service Provider");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsGeospatialPage');
  }

  createTable(){
  	this.awsGeo.createTable();
  }

  deleteTable(){
  	this.awsGeo.cleanUp().then((data)=>{
  		console.log(data);
  	}).catch((error)=>{
  		console.log(error);
  	});
  }

}
