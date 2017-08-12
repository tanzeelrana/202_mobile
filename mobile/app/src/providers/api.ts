import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { ParseProvider } from './parse/parse';
import * as appConfig from '../app/app.config';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

  backendProvider: any;

  constructor(
    public http: Http
  ) {
    this.init();
  }

  private init(){
    if(appConfig.config.backend.type == 'parse'){
      this.backendProvider = new ParseProvider(this.http);
    }    
  }

  login(account){
    return new Promise((resolve, reject) => {
      this.backendProvider.login(account).then((user)=>{
        resolve(user);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  logOut(){
    return new Promise((resolve, reject) => {
      this.backendProvider.logOut().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }

  delete(endpoint: string, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }
}
