import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNoticeForm } from './ap-notice-form';

@NgModule({
    declarations: [
        APNoticeForm,
    ],
    imports: [
        IonicPageModule.forChild(APNoticeForm),
    ],
    exports: [
        APNoticeForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class APNoticeFormModule { }
