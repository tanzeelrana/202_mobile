import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwsGeospatialPage } from './aws-geospatial';

@NgModule({
  declarations: [
    AwsGeospatialPage,
  ],
  imports: [
    IonicPageModule.forChild(AwsGeospatialPage),
  ],
  exports: [
    AwsGeospatialPage
  ]
})
export class AwsGeospatialPageModule {}
