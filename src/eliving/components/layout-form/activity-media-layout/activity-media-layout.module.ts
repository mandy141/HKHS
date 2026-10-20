import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityMediaLayout } from './activity-media-layout';

@NgModule({
  declarations: [
    ActivityMediaLayout,
  ],
  imports: [
    IonicPageModule.forChild(ActivityMediaLayout),
  ],
  exports: [
    ActivityMediaLayout
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActivityMediaLayoutModule {}

