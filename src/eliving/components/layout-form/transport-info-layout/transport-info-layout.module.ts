import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportInfoForm } from './transport-info-layout';

@NgModule({
    declarations: [
        TransportInfoForm,
    ],
    imports: [
        IonicPageModule.forChild(TransportInfoForm),
    ],
    exports: [
        TransportInfoForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TransportInfoFormModule { }
