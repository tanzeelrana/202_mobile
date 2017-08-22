import {NavController, NavParams, AlertController, Events, ModalController, PopoverController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './../api';

/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OrdersProvider {

  filters = {
    date:{
      name:'Date',
      range: false,
      selected: true,
      dateStart: '1990-12-23',
      dateEnd: '1990-12-23',
      sort: true
    },
    client:{
      name:'Client',
      selected: false,
      sort: true,
      searchString: '',
      searchStringPlaceholder: 'Search Client',
      cancelButtonText: 'Cancel',
      shouldShowCancel: false, 
      clients: []
    },
  };
  
  paginationLimit = 10;
  paginationIndex = 0;
  orders = [];

  

  constructor(
    public http: Http,
    public api: Api
  ) {
    
  }

}
