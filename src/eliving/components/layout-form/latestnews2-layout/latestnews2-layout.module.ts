import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LatestNews2Form } from './latestnews2-layout';

@NgModule({
    declarations: [
        LatestNews2Form,
    ],
    imports: [
        IonicPageModule.forChild(LatestNews2Form),
    ],
    exports: [
        LatestNews2Form
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LatestNews2FormModule { }
