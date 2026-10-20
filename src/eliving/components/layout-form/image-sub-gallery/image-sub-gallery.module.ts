import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageSubGallery } from './image-sub-gallery'

@NgModule({
    declarations: [
        ImageSubGallery,
    ],
    imports: [
        IonicPageModule.forChild(ImageSubGallery),
    ],
    exports: [
        ImageSubGallery
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ImageSubGalleryModule { }
