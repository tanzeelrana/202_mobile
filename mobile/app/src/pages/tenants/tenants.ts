import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TenantsProvider } from '../../providers/providers';
import { Tenant } from '../../models/tenant';

import { TenantCreatePage } from '../tenant-create/tenant-create';
import { TenantDetailPage } from '../tenant-detail/tenant-detail';

/**
 * Generated class for the TenantsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenants',
  templateUrl: 'tenants.html',
})
export class TenantsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public tenantsProvider: TenantsProvider
  ) {
  }

  ionViewDidLoad() {
    
  }

  addTenant(){
    let addModal = this.modalCtrl.create(TenantCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.tenantsProvider.add(item);
      }
    })
    addModal.present();
  }

  deleteTenant(item) {
    this.tenantsProvider.delete(item);
  }

  openTenant(item: Tenant) {
    this.navCtrl.push(TenantDetailPage, {
      item: item
    });
  }

}
