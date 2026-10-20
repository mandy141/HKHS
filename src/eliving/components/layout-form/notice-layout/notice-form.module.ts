import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeForm } from './notice-form';

@NgModule({
    declarations: [
        NoticeForm,
    ],
    imports: [
        IonicPageModule.forChild(NoticeForm),
    ],
    exports: [
        NoticeForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NoticeFormModule { }
