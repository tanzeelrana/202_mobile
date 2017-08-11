import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsTabRoute } from './maps-tab-route';

@NgModule({
  declarations: [
    MapsTabRoute,
  ],
  imports: [
    IonicPageModule.forChild(MapsTabRoute),
  ],
  exports: [
    MapsTabRoute
  ]
})
export class MapsTabRouteModule {}
