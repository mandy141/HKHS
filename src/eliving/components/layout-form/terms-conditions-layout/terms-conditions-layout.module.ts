import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsConditionsLayout } from './terms-conditions-layout';

@NgModule({
  declarations: [
    TermsConditionsLayout,
  ],
  imports: [
    IonicPageModule.forChild(TermsConditionsLayout),
  ],
  exports: [
    TermsConditionsLayout
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TermsConditionsLayoutModule {}
