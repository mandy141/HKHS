import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HscMenuLayout } from './hsc-menu-layout';

@NgModule({
  declarations: [
    HscMenuLayout,
  ],
  imports: [
    IonicPageModule.forChild(HscMenuLayout),
  ],
  exports: [
    HscMenuLayout
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HscMenuLayoutPageModule {}
