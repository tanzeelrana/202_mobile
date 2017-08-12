import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(
    public http: Http,
    private nativeStorage: NativeStorage
  ) {
  }

  storeItem(itemKey, item){
    return new Promise((resolve, reject) => {
      this.nativeStorage.setItem(itemKey, item)
      .then(() => {
        resolve('Stored item!');
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getItem(itemKey){
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem(itemKey)
      .then((item) => {
        resolve(item);
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
