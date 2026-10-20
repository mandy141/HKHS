import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNotice2Form } from './ap-notice2-form';

@NgModule({
    declarations: [
        APNotice2Form,
    ],
    imports: [
        IonicPageModule.forChild(APNotice2Form),
    ],
    exports: [
        APNotice2Form
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class APNotice2FormModule { }
