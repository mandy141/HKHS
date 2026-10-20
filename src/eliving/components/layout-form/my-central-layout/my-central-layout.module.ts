import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCentralForm } from './my-central-layout';

@NgModule({
    declarations: [
        MyCentralForm,
    ],
    imports: [
        IonicPageModule.forChild(MyCentralForm),
    ],
    exports: [
        MyCentralForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyCentralFormModule { }
