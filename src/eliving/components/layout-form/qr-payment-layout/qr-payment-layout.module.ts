import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrPaymentLayout } from './qr-payment-layout';

@NgModule({
  declarations: [
    QrPaymentLayout,
  ],
  imports: [
    IonicPageModule.forChild(QrPaymentLayout),
  ],
  exports: [
    QrPaymentLayout
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QrPaymentLayoutPageModule {}
