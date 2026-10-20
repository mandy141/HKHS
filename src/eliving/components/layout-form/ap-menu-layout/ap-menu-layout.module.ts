import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APMenuLayout } from './ap-menu-layout';

@NgModule({
  declarations: [
    APMenuLayout,
  ],
  imports: [
    IonicPageModule.forChild(APMenuLayout),
  ],
  exports: [
    APMenuLayout
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class APMenuLayoutPageModule {}
