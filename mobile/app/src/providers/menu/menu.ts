import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MenuController, Events } from 'ionic-angular';
import { User } from '../user';
import 'rxjs/add/operator/map';

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MenuProvider {
  
  menuEnabled = false;

  constructor(
    public http: Http,
    public menu: MenuController,
    public user: User,
    public events: Events
  ) {
    
  }
  
  initMenu() {
    this.menuEnabled = this.user._user? true:false;
    this.menu.enable(this.menuEnabled);
  }

}
