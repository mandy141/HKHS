import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageGallery } from './image-gallery';


@NgModule({
    declarations: [
        ImageGallery
    ],
    imports: [
        IonicPageModule.forChild(ImageGallery)
    ],
    exports: [
        ImageGallery
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ImageGalleryModule { }
