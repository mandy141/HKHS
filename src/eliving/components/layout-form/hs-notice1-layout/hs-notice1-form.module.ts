import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HSNotice1Form } from './hs-notice1-form';

@NgModule({
    declarations: [
        HSNotice1Form,
    ],
    imports: [
        IonicPageModule.forChild(HSNotice1Form),
    ],
    exports: [
        HSNotice1Form
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HSNotice1FormModule { }
