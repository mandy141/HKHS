import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InputFormPage } from "./input-form";
import { InputFieldComponent } from '../input-field/input-field-component';
import { LabelFieldComponent } from '../label-field/label-field-component';
import { PDFViewerFieldComponent } from '../pdf-viewer-field/pdf-viewer-field-component';
import { HTMLContentViewerFieldComponent } from '../html-content-viewer-field/html-content-viewer-field-component';
import { ButtonComponent } from '../button/button-component';
import { LinkButtonComponent } from '../link-button/link-button-component';
import { FileUploadFieldComponent } from '../file-upload-field/file-upload-field-component';
import { SubInputFormComponent } from '../sub-input-form/sub-input-form-component';
import { InputFieldGroupComponent } from '../input-field-group/input-field-group-component';
import { ConfirmDisplayFieldComponent } from '../confirm-display-field/confirm-display-field-component';
import { ConfirmDisplayFieldGroupComponent } from '../confirm-display-field-group/confirm-display-field-group-component';
import { ConfirmDisplaySubFormComponent } from '../confirm-display-sub-form/confirm-display-sub-form-component';
import { ImgBannerFieldComponent } from '../img-banner-field/img-banner-field-component';
import { ImgFieldComponent } from '../img-field/img-field-component';
import { IFrameFieldComponent } from '../iframe-field/iframe-field-component';

@NgModule({
    declarations: [
      InputFormPage,
      InputFieldComponent,      
      SubInputFormComponent,
      InputFieldGroupComponent,
      FileUploadFieldComponent,
      ConfirmDisplayFieldComponent,
      ConfirmDisplaySubFormComponent,
      ConfirmDisplayFieldGroupComponent,
      LabelFieldComponent,
      PDFViewerFieldComponent,
      ButtonComponent,
      LinkButtonComponent,
      HTMLContentViewerFieldComponent,
      ImgBannerFieldComponent,
      ImgFieldComponent,
      IFrameFieldComponent
    ],
    imports: [
      IonicPageModule.forChild(InputFormPage)
    ],
    exports: [
      InputFormPage
    ],    
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class InputFormPageModule {}