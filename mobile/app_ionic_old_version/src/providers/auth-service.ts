import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuthService {

  private isLoggedIn = false;

  constructor(
  	public http: Http
  ) 
  {}

  login() : void {
    
  }

  logout() : void {
    
  }

  authenticated() : boolean {
    return this.isLoggedIn;
  }

}
