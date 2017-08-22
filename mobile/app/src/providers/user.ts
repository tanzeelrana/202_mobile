import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  
  public _user: any = {};
  public roles = [];
  
  constructor(
    public http: Http, 
    public api: Api,
    public storage: Storage,
    public events: Events
  ) {
    this._user = api.isLoggedIn();
    this.initEventListeners();
  }

  initEventListeners(){
    this.events.subscribe('loggedInUserRoles', (roles)=>{
      this.loggedInUserRoles(roles);
      this.events.publish('initMenu',roles);
    });
  }

  loggedInUserRoles(roles){
    this.roles = roles;
  }
  
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    return new Promise((resolve, reject) => {
      this.api.login(accountInfo).then((user)=>{
        this._user = user;
        resolve(user);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    return new Promise((resolve, reject) => {
      this.api.login(accountInfo).then((user)=>{
        resolve(user);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    return new Promise((resolve, reject) => {
      this._user = null;
      this.roles = [];
      this.api.logOut().then(()=>{
        resolve();
      }).catch((error)=>{
        reject(error);
      });
    });
    
  }
}
