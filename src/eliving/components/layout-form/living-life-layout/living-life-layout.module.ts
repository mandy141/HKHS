import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivingLifeLayout } from './living-life-layout';

@NgModule({
  declarations: [
    LivingLifeLayout,
  ],
  imports: [
    IonicPageModule.forChild(LivingLifeLayout),
  ],
  exports: [
    LivingLifeLayout
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LivingLifeLayoutModule {}
