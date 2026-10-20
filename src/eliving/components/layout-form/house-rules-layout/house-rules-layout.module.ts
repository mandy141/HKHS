import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseRulesForm } from './house-rules-layout';

@NgModule({
    declarations: [
        HouseRulesForm,
    ],
    imports: [
        IonicPageModule.forChild(HouseRulesForm),
    ],
    exports: [
        HouseRulesForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HouseRulesFormModule { }
