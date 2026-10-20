import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APNotice3Form } from './ap-notice3-form';

@NgModule({
    declarations: [
        APNotice3Form,
    ],
    imports: [
        IonicPageModule.forChild(APNotice3Form),
    ],
    exports: [
        APNotice3Form
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class APNotice3FormModule { }
