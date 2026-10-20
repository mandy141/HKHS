import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantFeedbackListLayout} from './tenant-feedback-list-layout';

@NgModule({
  declarations: [
    TenantFeedbackListLayout,
  ],
  imports: [
    IonicPageModule.forChild(TenantFeedbackListLayout),
  ],
  exports: [
    TenantFeedbackListLayout
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TenantFeedbackListLayoutModule {}
