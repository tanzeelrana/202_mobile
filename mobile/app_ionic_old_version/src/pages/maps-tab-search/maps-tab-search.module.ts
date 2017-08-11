import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsTabSearch } from './maps-tab-search';

@NgModule({
  declarations: [
    MapsTabSearch,
  ],
  imports: [
    IonicPageModule.forChild(MapsTabSearch),
  ],
  exports: [
    MapsTabSearch
  ]
})
export class MapsTabSearchModule {}
