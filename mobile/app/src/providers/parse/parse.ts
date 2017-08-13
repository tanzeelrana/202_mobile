import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
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
    this.init();
  }

  private init(){
    Parse.initialize(this.BACKEND_APPLICATION_ID);
    Parse.serverURL = this.BACKEND_URL;
  }

  userHasRole(roleName) {
    return new Promise((resolve, reject) => {
      var query = new Parse.Query(Parse.Role);
      query.equalTo("name", roleName);
      query.equalTo("users", this.isLoggedIn());
      query.find().then((roles)=> {
          resolve(roles.length > 0);
      }).catch((error)=>{
        reject(error);
      });
    });      
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

  get(endpoint: string, params: any){
    return new Promise((resolve, reject) => {
      var obj = Parse.Object.extend(endpoint);
      var query = new Parse.Query(obj);
      //add query params here later
      query.find({
        success: function(results) {
          // Do something with the returned Parse.Object values
          resolve(results);
        },
        error: function(error) {
          reject("Error: " + error.code + " " + error.message);
        }
      });
    });      
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      Parse.Cloud.run(endpoint, body).then(function(result) {
        console.log(result);
        resolve(result);
      });
    });    
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
