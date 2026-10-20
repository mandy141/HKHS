import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformationForm } from './information-layout';

@NgModule({
    declarations: [
        InformationForm,
    ],
    imports: [
        IonicPageModule.forChild(InformationForm),
    ],
    exports: [
        InformationForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class InformationFormModule { }
