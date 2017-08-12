import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantsPage } from './tenants';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TenantsPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(TenantsPage),
  ],
  entryComponents: [
  ]
})
export class TenantsPageModule {}
