import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantFeedbackDetailLayout } from './tenant-feedback-detail-layout';

@NgModule({
  declarations: [
    TenantFeedbackDetailLayout
  ],
  imports: [
    IonicPageModule.forChild(TenantFeedbackDetailLayout),
  ],
})
export class TenantFeedbackDetailLayoutPageModule {}
