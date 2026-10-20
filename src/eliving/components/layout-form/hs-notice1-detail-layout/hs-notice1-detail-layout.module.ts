import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HSNotice1Detail } from './hs-notice1-detail-layout';

@NgModule({
  declarations: [
    HSNotice1Detail,
  ],
  imports: [
    IonicPageModule.forChild(HSNotice1Detail),
  ],
  exports: [
    HSNotice1Detail
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HSNotice1DetailModule {}
