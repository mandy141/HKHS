import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNotice2Detail } from './ap-notice2-detail-layout';

@NgModule({
  declarations: [
    APNotice2Detail,
  ],
  imports: [
    IonicPageModule.forChild(APNotice2Detail),
  ],
  exports: [
    APNotice2Detail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class APNotice2DetailModule {}
