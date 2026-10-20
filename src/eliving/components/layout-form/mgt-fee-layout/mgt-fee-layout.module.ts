import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MgtFeeForm } from './mgt-fee-layout';

@NgModule({
    declarations: [
        MgtFeeForm,
    ],
    imports: [
        IonicPageModule.forChild(MgtFeeForm),
    ],
    exports: [
        MgtFeeForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MgtFeeFormModule { }
