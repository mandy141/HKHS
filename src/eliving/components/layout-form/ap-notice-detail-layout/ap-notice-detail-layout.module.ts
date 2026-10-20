import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNoticeDetail } from './ap-notice-detail-layout';

@NgModule({
  declarations: [
    APNoticeDetail,
  ],
  imports: [
    IonicPageModule.forChild(APNoticeDetail),
  ],
  exports: [
    APNoticeDetail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class APNoticeDetailModule {}
