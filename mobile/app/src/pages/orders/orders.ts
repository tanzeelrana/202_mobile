import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Events, ModalController, PopoverController} from 'ionic-angular';
import { PopoverPage } from './filterPopover/filterPopover';
import { OrdersProvider } from '../../providers/orders/orders';

/**
 * Generated class for the OrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  
  private getMoreOrdersEvent: (posts) => void;
  private getOrdersEvent: (feed) => void;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private ordersCtrl: OrdersProvider
  ) {}

  ngOnInit() {}

  ionViewDidLoad() {}

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      filters: this.ordersCtrl.filters
    });
    popover.present({
      ev: ev
    });
  }

  orderSelected(order){
    console.log('orderSelected');
    console.log(order);
  }

  getClientSearchString(ev: any) {
    let val = ev.target.value;
    console.log(val);
  }

  doInfinite(index) {
    console.log('doInfinite : ' + index);
  }

}
