import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from './../api';

/*
  Generated class for the ClientsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ClientsProvider {

  constructor(
    public http: Http,
    public api: Api
  ) {
    this.getClients();
  }

  paginationLimit = 10;
  paginationIndex = 0;
  clients = [];

  getClients(params?: any){
    this.api.get('Client',params).then((clients)=>{
      console.log(clients);
      this.clients = (<any>clients);
    })
  }

  newClient(client){
    return new Promise((resolve, reject) => {
      this.api.post('newClient',client).then((client)=>{
        this.clients.push(client);
        resolve(this.clients);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  updateClient(client){
    return new Promise((resolve, reject) => {
      this.api.post('updateClient',client).then((client)=>{
        console.log(client);
        this.clients = (<any>client);
      })
    });
  }

}
