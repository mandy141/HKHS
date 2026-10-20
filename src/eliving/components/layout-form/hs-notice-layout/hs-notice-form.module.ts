import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HSNoticeForm } from './hs-notice-form';

@NgModule({
    declarations: [
        HSNoticeForm,
    ],
    imports: [
        IonicPageModule.forChild(HSNoticeForm),
    ],
    exports: [
        HSNoticeForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HSNoticeFormModule { }
