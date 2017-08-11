import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsTabSearchGoogle } from './maps-tab-search-google';
import { Settings } from '../settings/settings';

@NgModule({
  declarations: [
    MapsTabSearchGoogle,
    Settings,
  ],
  imports: [
    IonicPageModule.forChild(MapsTabSearchGoogle),
  ],
  exports: [
    MapsTabSearchGoogle
  ],
  entryComponents: [
    Settings
  ],
  providers: [
    
  ]
})
export class MapsTabSearchGoogleModule {}
