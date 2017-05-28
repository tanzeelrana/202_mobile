import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsTabSearchGoogle } from './maps-tab-search-google';

@NgModule({
  declarations: [
    MapsTabSearchGoogle,
  ],
  imports: [
    IonicPageModule.forChild(MapsTabSearchGoogle),
  ],
  exports: [
    MapsTabSearchGoogle
  ]
})
export class MapsTabSearchGoogleModule {}
