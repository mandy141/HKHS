import { Component, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { InputFormBaseModel }     from '../../../models/dynamic-form-model/input-form-base-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { ConstantAttributes } from '../../../attributes/constant-attributes';

@Component({
    selector: 'file-upload-field-component',
    templateUrl: 'file-upload-field-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class FileUploadFieldComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;
    @Input() form: FormGroup;    
    @ViewChild('fileInput') fileInput;
    @Input() mainFormModel: InputFormBaseModel;
    
    get ConstantAttributes() { return ConstantAttributes; }

    get formControl() { return this.form.controls[this.inputFieldModel.key]; }     
    
    get controlClass() {
      return this.inputFieldModel.controlClass;
    }

    get controlStyle() {
      return this.inputFieldModel.controlStyle;
    }        

    get labelDisplayStyle() {
      if(this.inputFieldModel.labelHidden)
          return 'none';
        else
          return 'inline';
    }

    /*get mainFormModel() {
      return this.qcs.getMainFormGroup(this.formControl)['formModel'];
    }*/

    showMandatoryStar()
    {
      if(this.inputFieldModel.validations)
      {
        if(this.inputFieldModel.controlType != ConstantAttributes.CONTROL_TYPE_CHECKBOX
          && this.inputFieldModel.controlType != ConstantAttributes.CONTROL_TYPE_CUSTOM
          && this.inputFieldModel.controlType != ConstantAttributes.CONTROL_TYPE_SUBFORMARRAY)
        {
          for (var i=0 ; i < this.inputFieldModel.validations.length; i++) { 
            if(this.inputFieldModel.validations[i].type == ConstantAttributes.VALIDATIONS_TYPE_REQUIRED)
              return true;
          }
        }
      }

      return false;
    }

    showLoadingIcon()
    {
      if(this.inputFieldModel.asyncProcessCnt != null && this.inputFieldModel.asyncProcessCnt > 0)
        return true;
      else
        return false;
    }

    isMatchCRUDModeForDisableHidden(applyInCRUDMode: string, mainFormCRUDMode: string)
    {
      if(applyInCRUDMode!= null && applyInCRUDMode.length > 0)
        return this.qcs.isMatchCRUDMode(applyInCRUDMode, mainFormCRUDMode);
      else
        return false;
    }
  
    constructor(private sanitizer: DomSanitizer, private qcs: DynamicFormControlService, private cd: ChangeDetectorRef,  private toastCtrl: ToastController) {            
    }    

    //MISC

    toJSONObject(sJSON: string) {
      if(sJSON)
        return JSON.parse(sJSON);
    }             

    get debugMode()
    {
      return DynamicFormControlService.debugMode;
    }
    
    //Image

    getImageFromWeb() {
      this.fileInput.nativeElement.click();
    }
  
    getImageFromWebCore(event) {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this.formControl.setValue(imageData);
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    getImageFromPhone(sourceType: number) {

      //console.log("Under Construction");
      
      /*const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        sourceType: sourceType,
      }
      this.camera.getPicture(options).then((imageData) => {
        this.formControl.setValue('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        let toast = this.toastCtrl.create({
          message: 'Get Picture Error: ' + err,
          duration: 5000,
          position: 'bottom'
        });
  
        toast.present();
      });*/
    }

  }