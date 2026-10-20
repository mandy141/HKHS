import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationForm } from './notification-layout';

@NgModule({
    declarations: [
        NotificationForm,
    ],
    imports: [
        IonicPageModule.forChild(NotificationForm),
    ],
    exports: [
        NotificationForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NotificationFormModule { }
