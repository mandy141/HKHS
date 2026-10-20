import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrPayment1Layout } from './qr-payment1-layout';

@NgModule({
  declarations: [
    QrPayment1Layout,
  ],
  imports: [
    IonicPageModule.forChild(QrPayment1Layout),
  ],
  exports: [
    QrPayment1Layout
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QrPayment1LayoutPageModule {}
