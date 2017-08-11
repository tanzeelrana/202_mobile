import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Home } from '../home/home';
import { About } from '../about/about';
import { Contact } from '../contact/contact';

/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

	tab1Root: any = Home;
  tab2Root: any = About;
  tab3Root: any = Contact;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams
  ) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

}