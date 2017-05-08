import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapsTabSearch } from '../maps-tab-search/maps-tab-search';
import { MapsTabRoute } from '../maps-tab-route/maps-tab-route';

/**
 * Generated class for the MapsTab page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-maps-tab',
  templateUrl: 'maps-tab.html',
})
export class MapsTab {

  mapsTabSearch: any = MapsTabSearch;
  mapsTabRoute: any = MapsTabRoute;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsTab');
  }

}

