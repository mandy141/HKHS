import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorPlanForm } from './floor-plan-layout';

@NgModule({
    declarations: [
        FloorPlanForm,
    ],
    imports: [
        IonicPageModule.forChild(FloorPlanForm),
    ],
    exports: [
        FloorPlanForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FloorPlanFormModule { }
