import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HSNotice2Form } from './hs-notice2-form';

@NgModule({
    declarations: [
        HSNotice2Form,
    ],
    imports: [
        IonicPageModule.forChild(HSNotice2Form),
    ],
    exports: [
        HSNotice2Form
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HSNotice2FormModule { }
