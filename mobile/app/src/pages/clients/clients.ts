import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ClientsProvider } from '../../providers/clients/clients';
import { MapsProvider } from '../../providers/maps/maps';

/**
 * Generated class for the ClientsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public clientsCtrl: ClientsProvider,
    public maps: MapsProvider
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ionViewWillLoad(){
    this.clientsCtrl.getClients();
  }

  ionViewDidLoad() {
    
  }

  clientSelected(client){
    this.navCtrl.push('ClientPage',{
      client: client,
      isEdit: false,
      isNew: false
    });
  }

  addClient(){
    this.navCtrl.push('ClientPage',{
      client: undefined,
      isEdit: false,
      isNew: true
    });
  }

  navigate(client){
    this.maps.startExternalMap(client.get('addressString'));
  }

  call(client){
    window.open('tel://' + client.get('phone') , '_system');
  }

  text(client){
    let smsLink2 = "sms:+01"+client.get('phone')+"?&body= "; 
    window.open(smsLink2 , '_system');
  }

}
