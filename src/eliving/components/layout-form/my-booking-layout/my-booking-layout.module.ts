import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingForm } from './my-booking-layout';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
    declarations: [
        MyBookingForm,
    ],
    imports: [
        IonicPageModule.forChild(MyBookingForm),
        LongPressModule
    ],
    exports: [
        MyBookingForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class MyBookingFormModule { }
