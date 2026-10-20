import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeDetail } from './notice-detail-layout';

@NgModule({
  declarations: [
    NoticeDetail,
  ],
  imports: [
    IonicPageModule.forChild(NoticeDetail),
  ],
  exports: [
    NoticeDetail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NoticeDetailModule {}
