import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Item } from '../models/item';

@Injectable()
export class Items {

  constructor(public api: Api) {
  }

  query(params?: any) {
    return this.api.get("Items", []).then((data)=>{
  
    }).catch((error)=>{
    
    })
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
