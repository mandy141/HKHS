import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNotice3Detail } from './ap-notice3-detail-layout';

@NgModule({
  declarations: [
    APNotice3Detail,
  ],
  imports: [
    IonicPageModule.forChild(APNotice3Detail),
  ],
  exports: [
    APNotice3Detail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class APNotice3DetailModule {}
