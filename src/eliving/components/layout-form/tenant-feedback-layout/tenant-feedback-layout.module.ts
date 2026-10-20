import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantFeedbackLayout} from './tenant-feedback-layout';

@NgModule({
  declarations: [
    TenantFeedbackLayout,
  ],
  imports: [
    IonicPageModule.forChild(TenantFeedbackLayout),
  ],
    exports: [
      TenantFeedbackLayout
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TenantFeedbackLayoutPageModule {}
