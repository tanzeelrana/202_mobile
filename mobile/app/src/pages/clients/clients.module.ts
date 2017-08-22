import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsPage } from './clients';

import { HttpModule, Http } from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientsPage),
    HttpModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
      }
    })
  ],
  providers: []
})
export class ClientsPageModule {}
