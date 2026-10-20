import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingForm } from './meeting-layout';

@NgModule({
    declarations: [
        MeetingForm,
    ],
    imports: [
        IonicPageModule.forChild(MeetingForm),
    ],
    exports: [
        MeetingForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MeetingFormModule { }
