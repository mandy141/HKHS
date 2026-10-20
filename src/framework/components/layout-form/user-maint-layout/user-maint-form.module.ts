import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMaintForm } from './user-maint-form';

@NgModule({
    declarations: [
        UserMaintForm,
    ],
    imports: [
        IonicPageModule.forChild(UserMaintForm),
    ],
    exports: [
        UserMaintForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserMaintFormModule { }
