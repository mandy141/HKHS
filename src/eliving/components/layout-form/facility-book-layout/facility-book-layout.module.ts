import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilityBookForm } from './facility-book-layout';

@NgModule({
    declarations: [
        FacilityBookForm,
    ],
    imports: [
        IonicPageModule.forChild(FacilityBookForm),
    ],
    exports: [
        FacilityBookForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FacilityBookFormModule { }
