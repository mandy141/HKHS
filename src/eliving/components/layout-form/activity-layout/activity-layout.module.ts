import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityForm } from './activity-layout';

@NgModule({
    declarations: [
        ActivityForm,
    ],
    imports: [
        IonicPageModule.forChild(ActivityForm),
    ],
    exports: [
        ActivityForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ActivityFormModule { }
