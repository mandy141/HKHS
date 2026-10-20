import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingRecord } from './my-booking-record';

@NgModule({
    declarations: [
        MyBookingRecord,
    ],
    imports: [
        IonicPageModule.forChild(MyBookingRecord),
    ],
    exports: [
        MyBookingRecord
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyBookingRecordModule { }
