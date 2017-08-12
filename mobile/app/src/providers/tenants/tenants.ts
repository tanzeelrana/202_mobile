import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './../api';

import { Tenant } from '../../models/tenant';

/*
  Generated class for the TenantsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TenantsProvider {

  public currentTenants: Tenant[];

  constructor(
    public http: Http,
    public api: Api
  ) {
    this.query().catch((error)=>{});
  }

  query(params?: any) : any {
    return new Promise((resolve, reject) => {
      this.api.get("Tenant", []).then((tenants)=>{
        this.currentTenants = (<any> tenants);
        resolve(tenants); 
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  add(tenant: Tenant) {
    return new Promise((resolve, reject) => {
      this.api.post("Tenant", tenant).then((result)=>{
        resolve(result);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  delete(tenant: Tenant) {
    return new Promise((resolve, reject) => {
      this.api.delete("Tenant", tenant).then((result)=>{
        resolve(result);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

}
