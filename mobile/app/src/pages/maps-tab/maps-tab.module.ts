import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsTab } from './maps-tab';

@NgModule({
  declarations: [
    MapsTab,
  ],
  imports: [
    IonicPageModule.forChild(MapsTab),
  ],
  exports: [
    MapsTab
  ]
})
export class MapsTabModule {}
