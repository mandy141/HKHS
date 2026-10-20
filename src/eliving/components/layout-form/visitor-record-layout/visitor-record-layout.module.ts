import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorRecordForm } from './visitor-record-layout';

@NgModule({
    declarations: [
        VisitorRecordForm,
    ],
    imports: [
        IonicPageModule.forChild(VisitorRecordForm),
    ],
    exports: [
        VisitorRecordForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class VisitorRecordFormModule { }
