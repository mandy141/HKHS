import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChangeLangPage} from './changeLang';

@NgModule({
    declarations: [
        ChangeLangPage,
    ],
    imports: [
        IonicPageModule.forChild(ChangeLangPage),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ChangeLangPageModule { }
