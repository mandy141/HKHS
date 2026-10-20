import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorFinishForm } from './visitor-finish-form';

@NgModule({
    declarations: [
        VisitorFinishForm,
    ],
    imports: [
        IonicPageModule.forChild(VisitorFinishForm),
    ],
    exports: [
        VisitorFinishForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class VisitorFinishFormModule { }
