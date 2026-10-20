import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjInfoLayout } from './proj-info-layout';

@NgModule({
  declarations: [
    ProjInfoLayout,
  ],
  imports: [
    IonicPageModule.forChild(ProjInfoLayout),
  ],
  exports: [
    ProjInfoLayout
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjInfoLayoutModule {}
