import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopDirectoryForm } from './shop-directory-layout';

@NgModule({
    declarations: [
        ShopDirectoryForm,
    ],
    imports: [
        IonicPageModule.forChild(ShopDirectoryForm),
    ],
    exports: [
        ShopDirectoryForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ShopDirectoryFormModule { }
