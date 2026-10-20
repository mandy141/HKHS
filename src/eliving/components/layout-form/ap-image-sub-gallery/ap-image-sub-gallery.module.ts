import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APImageSubGallery } from './ap-image-sub-gallery'

@NgModule({
    declarations: [
        APImageSubGallery,
    ],
    imports: [
        IonicPageModule.forChild(APImageSubGallery),
    ],
    exports: [
        APImageSubGallery
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class APImageSubGalleryModule { }
