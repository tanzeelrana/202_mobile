import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Settings } from '../providers/providers';
import { User } from '../providers/user';
import { TranslateService } from '@ngx-translate/core'
import { MenuProvider } from '../providers/menu/menu';

@Component({
  templateUrl: './app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  menu: any[];
  rootPage;

  constructor(
    private translate: TranslateService, 
    private platform: Platform, 
    public settings: Settings,
    public user: User,
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private menuProvider: MenuProvider,
    public events: Events
  ) {
    this.initTranslate();
    // always resolves so no need for catch
    this.load();

    this.events.subscribe('initMenu',(roles)=>{
      this.initMenu(roles);
    });

  }

  initMenu(roles){
    this.menu = this.menuProvider.initMenu(roles);
  }

  load(){
    this.menuProvider.gerRootPage().then((rootPage)=>{
      this.rootPage = rootPage;
      this.nav.setRoot(this.rootPage);
    })
    
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.user.logout().then(()=>{
      this.load();
    }).catch((error)=>{
      this.load();
    });
  }
  
}
