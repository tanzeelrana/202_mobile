import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MenuController, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { CardsPage } from '../../pages/cards/cards';
import { ContentPage } from '../../pages/content/content';
import { HomePage } from '../../pages/home/home';
import { ListMasterPage } from '../../pages/list-master/list-master';
import { LoginPage } from '../../pages/login/login';
import { MapPage } from '../../pages/map/map';
import { MenuPage } from '../../pages/menu/menu';
import { SearchPage } from '../../pages/search/search';
import { SettingsPage } from '../../pages/settings/settings';
import { SignupPage } from '../../pages/signup/signup';
import { TabsPage } from '../../pages/tabs/tabs';
import { TutorialPage } from '../../pages/tutorial/tutorial';
import { WelcomePage } from '../../pages/welcome/welcome';
import { User } from '../user';
import { Settings } from '../settings';

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MenuProvider {
  
  private pages_super: any[] = [
    { title: 'Tenants', component: "TenantsPage"},
    { title: 'Tutorial', component: TutorialPage },
    { title: 'Welcome', component: WelcomePage },
    { title: 'Tabs', component: TabsPage },
    { title: 'Cards', component: CardsPage },
    { title: 'Content', component: ContentPage },
    { title: 'Login', component: LoginPage },
    { title: 'Signup', component: SignupPage },
    { title: 'Map', component: MapPage },
    { title: 'Master Detail', component: ListMasterPage },
    { title: 'Menu', component: MenuPage },
    { title: 'Settings', component: SettingsPage },
    { title: 'Search', component: SearchPage }
  ]

  menuPages: any[] = [];

  constructor(
    public http: Http,
    public menuCtrl: MenuController,
    public user: User,
    public events: Events,
    public setting: Settings
  ) {
    this.initEventListeners();
  }

  initEventListeners(){
    this.events.subscribe('enableMenu',()=>{
      this.enableMenu();
    });

    this.events.subscribe('disableMenu',()=>{
      this.disableMenu();
    });

    this.events.subscribe('getRootPage',(event)=>{
      this.gerRootPage().then((rootPage)=>{
        this.events.publish('getRootPage'+event, rootPage);
      });
    });
  }

  gerRootPage(){
    return new Promise((resolve, reject) => {
      if(this.user._user){
        this.events.publish('enableMenu');
        resolve(HomePage);
      }else{
        this.events.publish('disableMenu');
        this.setting.getValue('_DISABLE_TUTORIAL').then((tutorialDisabled)=>{
          if(tutorialDisabled){
            resolve(WelcomePage);
          }else{
            resolve(TutorialPage);
          }
        }).catch((error)=>{
          // handle error and return tutorialPage
          resolve(TutorialPage);
        });
      }

    });
  }
  
  disableMenu() {
    this.menuCtrl.enable(false);
    this.menuPages = [];
  }

  enableMenu() {
    this.menuCtrl.enable(true);
  }

  initMenu(roles){  
    if(roles.length){
      let role = roles[0];
      this.getMenu(role);
    }else{
      this.menuPages = [];
    }
    return this.menuPages;
  }

  private getMenu(role: any): any{
    switch (role.getName()) {
      case "super": {
         break;
      }
     
      case "tenant": {
         this.getTenantMenu();
         break;
      }
     
      case "admin": {
         this.getAdminMenu();
         break;
      }
     
      case "employee": {
         this.getEmployeeMenu();
         break;
      }

      case "client": {
        this.getClientMenu();
        break;
      }

      case "customer": {
        this.getEmployeeMenu();
        break;
      }
     
      default: {
         console.error("Invalid role");
         break;
      }
   }
  }

  private getTenantMenu (){
    this.menuPages = [
      { title: 'Home', component: HomePage },
      { title: 'Clients', component: 'ClientsPage' },
    ]
  }

  private getAdminMenu (){
    this.menuPages = [
      { title: 'Home', component: HomePage },
      { title: 'Clients', component: 'ClientsPage' },
    ]
  }

  private getClientMenu (){
    this.menuPages = [
      { title: 'Home', component: HomePage },
    ]
  }

  private getEmployeeMenu (){
    this.menuPages = [
      { title: 'Home', component: HomePage },
    ]
  }

  private getSuperMenu (){
    this.menuPages = [
      { title: 'Home', component: HomePage },
      { title: 'Tenants', component: 'TenantsPage' },
    ]
  }

}
