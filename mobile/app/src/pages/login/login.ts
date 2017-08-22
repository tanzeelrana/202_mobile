import { Component } from '@angular/core';
import { Events, NavController, ToastController } from 'ionic-angular';
import { MainPage } from '../../pages/pages';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../providers/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: 'qex'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public events: Events
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.events.subscribe('getRootPageOnLogin',(rootPage)=>{
      this.navCtrl.setRoot(rootPage);
    })
  }
  
  

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).then((user) => {
      this.events.publish('enableMenu');
      this.events.publish('getRootPage','OnLogin');
    }).catch((err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString + ' ' + err.message ,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }
}
