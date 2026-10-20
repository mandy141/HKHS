import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LatestNewsForm } from './latestnews-layout';

@NgModule({
    declarations: [
        LatestNewsForm,
    ],
    imports: [
        IonicPageModule.forChild(LatestNewsForm),
    ],
    exports: [
        LatestNewsForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LatestNewsFormModule { }
