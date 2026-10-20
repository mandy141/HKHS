import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HSCImageSubGallery } from './hsc-image-sub-gallery'

@NgModule({
    declarations: [
      HSCImageSubGallery,
    ],
    imports: [
        IonicPageModule.forChild(HSCImageSubGallery),
    ],
    exports: [
      HSCImageSubGallery
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HSCImageSubGalleryModule { }
