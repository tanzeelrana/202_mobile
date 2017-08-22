import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { ParseProvider } from './parse/parse';
import * as appConfig from '../app/app.config';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

  backendProvider: any;

  constructor(
    public http: Http,
    public events: Events
  ) {
    this.init();
  }

  private init(){
    if(appConfig.config.backend.type == 'parse'){
      this.backendProvider = new ParseProvider(this.http);
    }
  }

  getUserRoles(){
    return new Promise((resolve, reject) => {
      this.backendProvider.getUserRoles().then((roles)=>{
        this.events.publish('loggedInUserRoles',roles);
        resolve(roles);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  isLoggedIn(){
    let user = this.backendProvider.isLoggedIn();
    if(user){this.getUserRoles()}
    return user;
  }

  login(account){
    return new Promise((resolve, reject) => {
      this.backendProvider.login(account).then((user)=>{
        this.getUserRoles();
        resolve(user);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  logOut(){
    return new Promise((resolve, reject) => {
      this.backendProvider.logOut().then(() => {
        this.events.publish('loggedInUserRoles',[]);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  get(endpoint: string, params?: any) {
    return new Promise((resolve, reject) => {
      this.backendProvider.get(endpoint,params).then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      this.backendProvider.post(endpoint,body,options).then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      
    });
  }

  getNew(endpoint: string){
    return this.backendProvider.getNew(endpoint);
  }
}
