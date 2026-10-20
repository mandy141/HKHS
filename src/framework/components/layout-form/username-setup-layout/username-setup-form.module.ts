import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserNameSetupForm } from './username-setup-form';

@NgModule({
    declarations: [
        UserNameSetupForm,
    ],
    imports: [
        IonicPageModule.forChild(UserNameSetupForm),
    ],
    exports: [
        UserNameSetupForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserNameSetupFormModule { }
