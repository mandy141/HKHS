import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HSNotice2Detail } from './hs-notice2-detail-layout';

@NgModule({
  declarations: [
    HSNotice2Detail,
  ],
  imports: [
    IonicPageModule.forChild(HSNotice2Detail),
  ],
  exports: [
    HSNotice2Detail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HSNotice2DetailModule {}
