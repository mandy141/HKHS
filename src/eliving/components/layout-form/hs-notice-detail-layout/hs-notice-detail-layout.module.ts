import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HSNoticeDetail } from './hs-notice-detail-layout';

@NgModule({
  declarations: [
    HSNoticeDetail,
  ],
  imports: [
    IonicPageModule.forChild(HSNoticeDetail),
  ],
  exports: [
    HSNoticeDetail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HSNoticeDetailModule {}
