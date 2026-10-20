import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFinishForm } from './book-finish-form';

@NgModule({
    declarations: [
        BookFinishForm,
    ],
    imports: [
        IonicPageModule.forChild(BookFinishForm),
    ],
    exports: [
        BookFinishForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BookFinishFormModule { }
