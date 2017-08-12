import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import Parse from 'parse';

/*
  Generated class for the ParseProvider provider.

  type: "parse",
  BACKEND_URL: 'http://162.243.118.87:1340/parse',
  BACKEND_APPLICATION_ID:"202_app_id",
  BACKEND_REST_API_KEY: "202_rest_id",
  BACKEND_MASTER_KEY: ""
  
*/
  
@Injectable()
export class ParseProvider {

  private BACKEND_URL: string = 'http://162.243.118.87:1340/parse';
  private BACKEND_APPLICATION_ID: string = '202_app_id';
  constructor(public http: Http) {
    console.log('Hello ParseProvider Provider');
    this.init();
  }

  private init(){
    Parse.initialize(this.BACKEND_APPLICATION_ID);
    Parse.serverURL = this.BACKEND_URL;
  }

  isLoggedIn(){
    return Parse.User.current();
  }

  login(account){
    return new Promise((resolve, reject) => {
      Parse.User.logIn(account["email"], account["password"], {
          success: function(user) {
              resolve(user);
          },
          error: function(user, error) {
              reject(error);
          }
        });
    });
  }

  logOut(){
    return new Promise((resolve, reject) => {
      Parse.User.logOut().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.BACKEND_URL + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.BACKEND_URL + '/' + endpoint, body, options);
    
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.BACKEND_URL + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.BACKEND_URL + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.BACKEND_URL + '/' + endpoint, body, options);
  }
}
