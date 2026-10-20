import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubhouseNoticeForm } from './clubhouse-notice-form';

@NgModule({
    declarations: [
        ClubhouseNoticeForm,
    ],
    imports: [
        IonicPageModule.forChild(ClubhouseNoticeForm),
    ],
    exports: [
        ClubhouseNoticeForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ClubhouseNoticeFormModule { }
