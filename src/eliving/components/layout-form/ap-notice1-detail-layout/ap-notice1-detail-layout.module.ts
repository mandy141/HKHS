import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNotice1Detail } from './ap-notice1-detail-layout';

@NgModule({
  declarations: [
    APNotice1Detail,
  ],
  imports: [
    IonicPageModule.forChild(APNotice1Detail),
  ],
  exports: [
    APNotice1Detail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class APNotice1DetailModule {}
