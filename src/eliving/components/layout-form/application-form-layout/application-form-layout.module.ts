import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationForm } from './application-form-layout';

@NgModule({
    declarations: [
        ApplicationForm,
    ],
    imports: [
        IonicPageModule.forChild(ApplicationForm),
    ],
    exports: [
        ApplicationForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ApplicationFormModule { }
