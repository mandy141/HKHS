import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNotice1Form } from './ap-notice1-form';

@NgModule({
    declarations: [
        APNotice1Form,
    ],
    imports: [
        IonicPageModule.forChild(APNotice1Form),
    ],
    exports: [
        APNotice1Form
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class APNotice1FormModule { }
