import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertsService {

  constructor(public http: Http) {
    console.log('Hello Alerts Service Provider');
  }
	

	// data : {
		// title: title,
		// message: message,
		// inputs: [
		//   {
		//     name: 'title',
		//     placeholder: 'Title'
		//   },
		// ],
		// buttons: [
		//   {
		//     text: 'Cancel',
		//     handler: data => {
		//       console.log('Cancel clicked');
		//     }
		//   },
		//   {
		//     text: 'Save',
		//     handler: data => {
		//       console.log('Saved clicked');
		//     }
		//   }
		// ]
	// }

  getPromptAlert(alertCtrl: AlertController, data){
  	let prompt = alertCtrl.create({
      title: data.title,
      message: data.message,
      inputs: data.inputs,
      buttons: data.buttons
    });
    return prompt;
  }

 //  getRadioAlert(alertCtrl: AlertController, data){
	// let alert = alertCtrl.create();
	// alert.setTitle(data.title);
 //  	for (let input of data.inputs) {
	//     alert.addInput({
	//       type: 'radio',
	//       label: input.label,
	//       value: input.value,
	//       checked: true
	//     });
	// }
	// alert.addButton(data.buttons.Cancel);
	// alert.addButton(data.buttons.OK);
 //    return alert;
 //  }
}
