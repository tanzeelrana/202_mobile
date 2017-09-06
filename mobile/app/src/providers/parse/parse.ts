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
    console.log("init");
  }

  isLoggedIn(){
    let user = Parse.User.current();
    return user;
  }

  getNew(object: String){
    var ParseObject = Parse.Object.extend(object);
    var parseObject = new ParseObject();
    return parseObject;
  }

  save(parseObject){
    return new Promise((resolve, reject) => {
      parseObject.save(null, { useMasterKey: true }).then(
        function(parseObject) {
          resolve(parseObject);
        },
        function(parseObject, error) {
          reject(error);
        }
      );
    });
  }

  getUserRoles(){
    return new Promise((resolve, reject) => {
      var query = new Parse.Query(Parse.Role);
      query.equalTo("users", Parse.User.current());
      query.ascending("level");
      query.find().then((roles)=> {
        resolve(roles);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  login(account){
    let me = this;
    return new Promise((resolve, reject) => {
      Parse.User.logIn(account["email"], account["password"], {
          success: function(user) {
            me.getUserRoles();
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
      body['currentUser'] = Parse.User.current().toJSON();
      Parse.Cloud.run(endpoint, body).then(function(result) {
        console.log(result);
        resolve(result);
      }).catch((error)=>{
        reject(error);
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
