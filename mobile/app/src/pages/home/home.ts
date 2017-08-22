import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { OrdersPage } from '../orders/orders';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  feedsTab: any = FeedPage;
  ordersTab: any = OrdersPage;

  feedsTabTitle = " ";
  ordersTabTitle = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['FEED_TAB_TITLE', 'ORDERS_TAB_TITLE']).subscribe(values => {
      this.feedsTabTitle = values['FEED_TAB_TITLE'];
      this.ordersTabTitle = values['ORDERS_TAB_TITLE'];
    });
  }

}
