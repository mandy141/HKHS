import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoForm } from './video-layout';

@NgModule({
    declarations: [
        VideoForm,
    ],
    imports: [
        IonicPageModule.forChild(VideoForm),
    ],
    exports: [
        VideoForm
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class VideoFormModule { }
