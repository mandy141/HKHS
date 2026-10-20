import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginForm } from './login-form';

@NgModule({
    declarations: [
        LoginForm,
    ],
    imports: [
        IonicPageModule.forChild(LoginForm),
    ],
    exports: [
        LoginForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LoginFormModule { }
