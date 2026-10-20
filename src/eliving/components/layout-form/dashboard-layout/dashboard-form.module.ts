import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashBoardForm } from './dashboard-form';

@NgModule({
    declarations: [
        DashBoardForm,
    ],
    imports: [
        IonicPageModule.forChild(DashBoardForm),
    ],
    exports: [
        DashBoardForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashBoardFormModule { }
