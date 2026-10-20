import { Component, Input } from '@angular/core';
import { NavParams, IonicPage, Events, ActionSheetController, AlertController } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpClient } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';;
import { DeviceService } from '../../../../framework/services/device-service';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { TenantFeedbackLayoutBaseModel } from '../../../models/layout-form-model/tenant-feedback-layout-base-model';
import { TenantFeedbackFinishBaseModel } from '../../../models/layout-form-model/tenant-feedback-finish-base-model';
import { TenantFeedbackImageFinishBaseModel } from '../../../models/layout-form-model/tenant-feedback-image-finish-base-model';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfigService } from '../../../../framework/services/config-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { of } from 'rxjs';
import { e, d } from '@angular/core/src/render3';
import { Base64 } from "@ionic-native/base64";


@IonicPage()
@Component({
  selector: 'tenant-feedback-layout',
  templateUrl: 'tenant-feedback-layout.html',
})
export class TenantFeedbackLayout {

  private data: TenantFeedbackLayoutBaseModel;
  private uniqueIdentifier: string;
  private imageResponse: any;
  private options: any;
  imgPreview = 'assets/ckah/hkhs_logo1.png';
  private currentStep: number = 1;
  private images = [];
  private base64Image: string;
  datalist_location: any;
  datalist_locationCatg: any;
  datalist_msgItem: any;
  datalist_catg: any;
  private kbytes: number;
  private step1ErrorMsg: string;
  private step2ErrorMsg: string;


  private LocType: string;
  private LocCatgType: string;
  private MsgType: string
  private CatgType: string;
  private inputTitle: string;
  private inputTitleMRS: string
  private inputTitleMR: string;
  private inputDetail: string;
  private inputName: string;
  private inputTel: string;
  private inputEmail: string;
  private isRequstForReply: string;
  private inputImage = [];
  private picRefNo: string;

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private navCtrl: NavController, private social: SocialSharing, private deviceSrv: DeviceService, private http: HttpClient,
    private sanitizer: DomSanitizer, private configSrv: ConfigService, private alertCtrl: AlertController, private file: File,
    private imagePicker: ImagePicker, public actionSheetCtrl: ActionSheetController, private camera: Camera, private storage: Storage,
    private transfer: FileTransfer, private base64: Base64) { }

  ngOnInit() {
    if (this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME)) {
      var paramObj = {};
      paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME);
      paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_LOAD_LAYOUT_FORM;
      paramObj[ConstantAttributes.PARAM_CRUD_MODE] = this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE);
      if (this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS)) {
        var additionalParams: { key: string, value: string }[] = this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS);
        for (let additionalParam of additionalParams) {
          paramObj[additionalParam.key] = additionalParam.value;
        }
      }

      //this.uniqueIdentifier = paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER];

      this.apiReqService.callAPIRequest<TenantFeedbackLayoutBaseModel>(paramObj, true)
        .then((_data: TenantFeedbackLayoutBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          if (_data) {
            this.data = _data;
            this.datalist_location = this.data.locationItems;
            this.datalist_locationCatg = this.data.locationCatgItems;
            this.datalist_msgItem = this.data.messageItems;
            this.datalist_catg = this.data.catgItems;
            this.inputEmail = "";
            this.picRefNo = "";
            ////console.log(this.data);
            /*
            let alert = this.alertCtrl.create({
              title: 'Low battery',
              message: '10% of battery remaining',
              buttons: ['Dismiss'],
              cssClass: 'alertDanger'
            });
            alert.present();*/
          }
          else {
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
          }
        }).catch(error => {
          if (error && error.status === 401) {
            //Do Nothing
          }
          else
            this.onBackToHome();
        });
    }
    else
      this.onBackToHome();
  }
  /*
      private getPhoto() {
        let options = {
          maximumImagesCount: 3
        };
        
        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {
              this.imgPreview = results[i];
              //console.log(this.imgPreview);
              this.base64.encodeFile(results[i]).then((base64File: string) => {
                //console.log(base64File);
              }, (err) => {
                //console.log(err);
              });
          }
        }, (err) => { });
        
       this.imagePicker.hasReadPermission().then((hasReadPermission)=>{
        //console.log("--hasReadPermission--" + hasReadPermission);
        if(hasReadPermission == true){
          this.imagePicker.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                this.imgPreview = results[i];
                ////console.log(this.imgPreview);
                this.base64.encodeFile(results[i]).then((base64File: string) => {
                  ////console.log(this.calculateImageSize(base64File));
                  this.inputImage[i] += this.calculateImageSize(base64File);
                  ////console.log(this.inputImage[i]);
                }, (err) => {
                  //console.log(err);
                });
            }
          }, (err) => { });
        }else {
          //console.log("no permission");
        }
      });
      }
    */
  private presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.data.addImageText,//'Take Photo',
      cssClass: 'headChoice',
      buttons: [
        {
          text: this.data.takePhotoText,//'Take Photo',
          icon: 'ios-arrow-forward',
          role: 'destructive',
          handler: () => {
            const options: CameraOptions = {
              quality: this.data.cameraPicQuality,
              targetHeight: this.data.cameraPicHeight,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              correctOrientation: true
            }
            this.camera.getPicture(options).then((result) => {
              //this.headerImage = result || 'assets/img/user.png';
              ////console.log(result)

              var imagePath = result.substr(0, result.lastIndexOf('/') + 1);
              var imageName = result.substr(result.lastIndexOf('/') + 1);
              ////console.log('Image Path: '+ imagePath); 
              ////console.log('Image Name: '+ imageName); 
              this.file.resolveLocalFilesystemUrl(result).then(fileEntry => {
                fileEntry.getMetadata(function (metaData) {
                  //console.log(JSON.stringify(metaData));
                  //return ((metaData.size/1024)/1024); //SIZE IN MB
                },
                  err => { }
                );
              },
                err => { }
              );

              this.inputImage.push({ filePath: imagePath, fileName: imageName });
              this.file.readAsDataURL(imagePath, imageName).then(base64File => {
                var imageBase64 = base64File.substr(base64File.lastIndexOf(',') + 1);
                ////console.log(base64File);
                //this.images.push({filePath:imagePath, fileName:imageName, fileContent: base64File })
                this.images.push({ fileContent: base64File })
              }, (err) => {
                //console.log(err);
              });

            }, (err) => {
              // Handle error
            });
          }
        }, {
          text: this.data.fromGalleryText,//'From Gallery',
          icon: 'ios-arrow-forward',
          handler: () => {
            //使用camera開gallery
            //          alert("DestinationType格式:"+this.camera.DestinationType.DATA_URL);
            /*
                        const options: CameraOptions = {
                          quality: 100,
            //            destinationType: this.camera.DestinationType.FILE_URI,
                          destinationType: this.camera.DestinationType.DATA_URL,
                          encodingType: this.camera.EncodingType.PNG,
                          mediaType: this.camera.MediaType.PICTURE,
                          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, 40
                          correctOrientation:true,
                          allowEdit: true,
                          targetWidth: 100,
                                targetHeight: 100,   
                        }
                        this.camera.getPicture(options).then((result) => {
            //              alert(result);
            
                            for(var i =0; i < result.length; i++) { 
                              //console.log('Image URI: '+ results[i]); 
                              } 
                            //let imgSrc = 'data:image/jpeg;base64,' + result
                            ////console.log(imgSrc);
                            
                          this.headerImage = imgSrc || 'assets/img/user.png';
                          let imgPost = `<form id="frm_profilephoto" method="post" enctype="multipart/form-data">
                                            <input type="hidden" name="UID" value="${this.Share.UserId}"/>
                                            <input type="file" name="profilephhoto" value="${this.headerImage}"/>
                                        </form>`
                          
                          //console.log(imgPost);
                          this.meService.UpLoad(imgPost,true).then(data => {
                                            alert(JSON.stringify(data));
                                    });
                        }, (err) => {
                         // Handle error
                        });
            */
            if (this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_IOS){
            //使用imagePicker打開image Gallery
            var options = { maximumImagesCount: this.data.maximumImagesCount, /*width:1200, */height: this.data.galleryPicHeight, quality: this.data.galleryPicQuality, outputType: 0 };
            this.imagePicker.getPictures(options).then((result) => {
              //this.images = [];
              /*
              for(var i =0; i < result.length; i++) { 
                //console.log('Image URI: '+ result[i]); 
                this.images += result[i];
                } 
               //this.headerImage = result || 'assets/img/headperson.png';
               */
              //let arr = JSON.parse(result);

              /*for (let img of result) {
                let filePath = img;
                this.images.push({ filePath: filePath });
              }*/
              for (var i = 0; i < result.length; i++) {
                ////console.log('Image URI: '+ result[i]); 

                var imagePath = result[i].substr(0, result[i].lastIndexOf('/') + 1);
                var imageName = result[i].substr(result[i].lastIndexOf('/') + 1);
                this.inputImage.push({ filePath: imagePath, fileName: imageName });
                ////console.log('Image Name: '+ imageName); 

                ////console.log('Image '+ imagePath+imageName); 
                //this.base64Image = "data:image/png;base64," + result[i];
                //this.base64Image = result[i];
                //  //console.log("Image URL",this.base64Image);
                //  //console.log("base64Size"+this.calculateImageSize(this.base64Image));
                // //console.log('Image '+ imagePath+imageName); 

                this.file.readAsDataURL(imagePath, imageName).then(base64File => {
                  //var imageBase64 = base64File.substr(base64File.lastIndexOf(',') + 1);
                  ////console.log(base64File);
                  //var smalltestpc = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAALSURBVAgdY/jPAAACAQEAxV8bXgAAAABJRU5ErkJggg==";
                  ////console.log('readAsDataURL Image '+ imagePath+imageName); 
                  //this.images.push({ fileName:imageName, fileContent: base64File, filePath: imagePath})
                  //this.images.push({ fileName:imageName, fileContent: smalltestpc })
                  this.images.push({ fileContent: base64File })
                }, (err) => {
                  //console.log(err);
                });

                //  //console.log(this.images);
                //this.inputImage[0] = this.images;
                //this.inputImage = result[i];

              }
            }, (err) => { });
          }
          else {
            const options: CameraOptions = {
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              quality: this.data.galleryPicQuality,
              targetHeight: this.data.galleryPicHeight,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              correctOrientation: true
            }

            this.camera.getPicture(options).then((result) => {
              //this.headerImage = result || 'assets/img/user.png';
              ////console.log(result)


              var imagePath = result.substr(0, result.lastIndexOf('/') + 1);
              var imageName = result.substr(result.lastIndexOf('/') + 1);
              //console.log('Image Path: ' + imagePath);
              //console.log('Image Name: ' + imageName);

              this.inputImage.push({ filePath: imagePath, fileName: imageName });
              this.base64.encodeFile(result).then((base64File: string) => {
                //this.regData.avatar = base64File;



                //console.log(this.images.length)
                if (this.images.length < this.data.maximumImagesCount) {
                  this.images.push({ fileContent: this.sanitizer.bypassSecurityTrustResourceUrl(base64File) });
                  //this.formControl.setValue(this.inputImage);
                }

              }, (err) => {
                //console.log(err);
              });

              /*
             let imageBase64Image = 'data:image/jpeg;base64,' + result;
              //console.log(imageBase64Image);
              var upImagePath, upIageName;
              
              var upDateTime = new Date().getFullYear().toString()+new Date().getMonth().toString()+new Date().getDay().toString()+ 
                              new Date().getHours().toString()+new Date().getMinutes().toString()+ new Date().getSeconds().toString();
               var upFileName = 'image'+ upDateTime+'.jpg';

             
              this.file.writeFile(this.file.cacheDirectory, upFileName, this.dataURIToBlob(imageBase64Image), { replace: true }).then(fileEntry => {
                console.log(fileEntry);
                upImagePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                upIageName = fileEntry.nativeURL.substr(fileEntry.nativeURL.lastIndexOf('/') + 1);
                console.log('Image Path: '+ upImagePath); 
                console.log('Image Name: '+ upIageName); 
                console.log('Image: '+ upImagePath+upIageName); 

                if (upImagePath.trim().length > 0)
                this.inputImage.push({ filePath: upImagePath, fileName: upIageName });
                
              }, (err) => {
                console.log(err);
              });

              */
              //this.inputImage.push({ filePath: imagePath, fileName: imageName });

              //this.images.push({ fileContent: imageBase64Image });





            }, (err) => {
              // Handle error

            });
          }
          }
        }, {
          text: this.data.cancelText,
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();


  }

  private isAllowNextStep() {
    switch (this.currentStep) {
      case 1:
        if (this.CatgType && this.CatgType.length > 0 && this.LocType && this.LocType.length > 0 && this.MsgType && this.MsgType.length > 0
          && this.LocCatgType && this.LocCatgType.length > 0 && (this.inputDetail && this.inputDetail.trim().length > 0
            || this.images && this.images.length > 0)) {
          //this.step1ErrorMsg = "error";
          ////console.log(this.inputImage.length);
          return true;
        }
        else {
          return false;
        }
      case 2:
        if (this.inputTitle && this.inputTitle.length > 0 && this.inputName && this.inputName.length > 0
          && this.inputTel && this.inputTel.length > 0) {
          //Validate Mobile No.
          var rePhone = new RegExp(this.data.validatePhoneNoPattern);
          if (!rePhone.test(this.inputTel.trim())) {
            this.step2ErrorMsg = this.data.lblInvalidPhoneNoMsg;
            return false;
          }
          else {
            if (this.inputEmail && this.inputEmail.length > 0) {
              //Validate Email
              var reEmail = new RegExp(this.data.validateEmailPattern);
              if (!reEmail.test(this.inputEmail.trim())) {
                this.step2ErrorMsg = this.data.lblInvalidEmailMsg;
                return false;
              }
              else {
                this.step2ErrorMsg = "";
                return true;
              }
            }
            else {
              this.step2ErrorMsg = "";
              return true;
            }

          }


        }
        else {
          return false;
        }
      default:
        return false;
    }
  }

  private deleteImage(imgEntry, position) {
    //console.log('delete');
    this.images.splice(position, 1);
    this.inputImage.splice(position, 1);
  }

  private onNextStep() {
    if (this.images.length > 0) {
      if (this.images.length > this.data.maximumImagesCount) {
        let alert = this.alertCtrl.create({
          //title: this.data.,
          message: this.data.errorMaxPicMsg + this.data.maximumImagesCount,
          buttons: [
            {
              text: this.data.btnText,
              handler: data => {
                ////console.log('Ok clicked, onBackToHome');
                //this.onRefreshPage()
              }
            }
          ]
        });

        alert.present();
        this.currentStep = 1;
      }
      else {
        this.currentStep = 2;
      }


    }
    else {
      this.currentStep = 2;
    }

  }
  private onBackStep() {

    this.currentStep = 1;
  }

  private onRecordList(item: CheckPointBaseModel) {
    this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE, item);
  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }


  private onClose() {
    this.navCtrl.pop().catch(
      error => {
        //Do Nothing
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
      }
    );
  }


  private async onUpload() {
    //console.log("upload");
    //console.log(encodeURI(this.configSrv.API_HOST+'/'+this.configSrv.UPLOAD_FILE));
    //console.log(JSON.stringify(this.inputImage));
    var paramObj = {};
    this.loadingSrv.createLoadingSpinner();
    const fileTransfer: FileTransferObject = this.transfer.create();



    for (var i = 0; i < this.inputImage.length; i++) {
      let options: FileUploadOptions = {
        fileKey: 'upload_file',
        fileName: this.inputImage[i].fileName,
        //chunkedMode: false,
        //mimeType: "image/jpeg",
        params: { 'upload_file': 'upload_file', 'token': this.data.userIdentity.token },
        headers: {}
      }
      //console.log(this.inputImage[i].filePath+this.inputImage[i].fileName);

      await fileTransfer.upload(this.inputImage[i].filePath + this.inputImage[i].fileName, encodeURI(this.configSrv.API_HOST + '/' + this.configSrv.UPLOAD_FILE), options)
        .then((data) => {

          if (data.response.substr(data.response.lastIndexOf(':') + 1).replace('}', '') == "0") {
            this.loadingSrv.dismissAllLoading();
            let alert = this.alertCtrl.create({
              //title: this.data.,
              message: this.data.errorPicMsg,//"Upload Pic Error",
              buttons: [
                {
                  text: this.data.btnText,
                  handler: data => {
                    ////console.log('Ok clicked, onBackToHome');
                    //this.onRefreshPage()
                  }
                }
              ]
            });
            alert.present();
            return;
          }
          else {
            // success
            ////console.log("Data"+JSON.stringify(data));
            if (i == 0) {
              //console.log(data.response.substr(data.response.lastIndexOf(':') + 1).replace('}',''));
              this.picRefNo = data.response.substr(data.response.lastIndexOf(':') + 1).replace('}', '');
              /*
              if(i == (this.inputImage.length-1))
              {
                //console.log("data ="+i);
                    //console.log("insert");
                    var paramObj = {};
                  
                    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_TENANT_FEEDBACK;
                
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC] = this.LocType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC_CATG] = this.LocCatgType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_MSG_TYPE] =this.MsgType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_CATG] = this.CatgType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_DETAIL] = this.inputDetail;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.picRefNo;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TITLE] = this.inputTitle;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TEL] = this.inputTel;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_NAME] = this.inputName;
                  //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_EMAIL] = this.inputEmail;
                    if(this.isRequstForReply){
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "Y";
                    }
                    else
                    {
                      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "N";
                    }
                    ////console.log(this.inputImage);
                    //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.inputImage;
                    
                      
                    this.coreSubmit(paramObj);
              }
              */
            }
            else {
              this.picRefNo += ";" + data.response.substr(data.response.lastIndexOf(':') + 1).replace('}', '');
              /*
              if(i == (this.inputImage.length-1))
              {
                //console.log("data ="+i);
                    //console.log("insert");
                    var paramObj = {};
                  
                    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_TENANT_FEEDBACK;
                
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC] = this.LocType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC_CATG] = this.LocCatgType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_MSG_TYPE] =this.MsgType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_CATG] = this.CatgType;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_DETAIL] = this.inputDetail;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.picRefNo;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TITLE] = this.inputTitle;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TEL] = this.inputTel;
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_NAME] = this.inputName;
                  //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_EMAIL] = this.inputEmail;
                    if(this.isRequstForReply){
                    paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "Y";
                    }
                    else
                    {
                      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "N";
                    }
                    ////console.log(this.inputImage);
                    //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.inputImage;
                    
                      
                    this.coreSubmit(paramObj);
              }*/
            }
            if (i == (this.inputImage.length - 1)) {
              //console.log("data ="+i);
              //console.log("insert");
              var paramObj = {};

              paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_TENANT_FEEDBACK;

              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC] = this.LocType;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC_CATG] = this.LocCatgType;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_MSG_TYPE] = this.MsgType;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_CATG] = this.CatgType;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_DETAIL] = this.inputDetail;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.picRefNo;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TITLE] = this.inputTitle;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TEL] = this.inputTel;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_NAME] = this.inputName;
              paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_EMAIL] = this.inputEmail;
              if (this.isRequstForReply) {
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "Y";
              }
              else {
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "N";
              }
              ////console.log(this.inputImage);
              //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.inputImage;


              this.coreSubmit(paramObj);
            }
          }

        }, (err) => {
          // error
          //console.log("Error"+JSON.stringify(err));
        })


    }



    /*
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_TENANT_UPLOAD;

    for(var i =0; i < this.images.length; i++) { 
      
      //console.log('Image URI: '+ this.images[i].fileContent); 
      //console.log('Image length: '+this.images.length);
      //var imagePath = this.images[i].filePath;
      var imageName = this.images[i].fileName;
      var imageType = this.images[i].fileContent.substr(0, this.images[i].fileContent.lastIndexOf(',') + 1);
      

      ////console.log('Image Path: '+ this.images[i].fileContent); 
      ////console.log('Image Name: '+ imageName); 
      ////console.log('Image Type: '+ imageType.replace(';base64','').replace('data:','')); 
    
        paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_TENANT_UPLOAD;
        paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_MIMETYPE] = imageType.replace(';base64','').replace('data:','');
        paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_FILENAME] = imageName;
        paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_CONTENT] =this.images[i].fileContent.substr(this.images[i].fileContent.lastIndexOf(',') + 1);;
       
        await this.apiReqService.callAPIRequest<TenantFeedbackImageFinishBaseModel>(paramObj, true, null, true)
        .then((data: TenantFeedbackImageFinishBaseModel) => {  
        //.then((data: ApiResultModel<string>) => {  
        if(data) 
        {         
            //console.log(data);  
            if(i == 0)
            {
              //console.log("data ="+i);
              this.picRefNo = data.file_row_id;
            }
            else
            {
              this.picRefNo += ";"+data.file_row_id;
              if(i == (this.images.length-1))
              {
                //console.log("data ="+i);
                //console.log("insert");
                var paramObj = {};
              
                paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_TENANT_FEEDBACK;
            
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC] = this.LocType;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC_CATG] = this.LocCatgType;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_MSG_TYPE] =this.MsgType;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_CATG] = this.CatgType;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_DETAIL] = this.inputDetail;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.picRefNo;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TITLE] = this.inputTitle;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TEL] = this.inputTel;
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_NAME] = this.inputName;
              //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_EMAIL] = this.inputEmail;
                if(this.isRequstForReply){
                paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "Y";
                }
                else
                {
                  paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "N";
                }
                //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.inputImage;
                
                  
                this.coreSubmit(paramObj);
              }
            }
          
        }
        else
        {
            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        }           
    }).catch(error => {        
           // this.loginFailMsg = error;        
            let alert = this.alertCtrl.create({
              title: "Error",
              message: error,
              buttons: [
                {
                  text: "OK",
                  handler: data => {
                    ////console.log('Ok clicked, onBackToHome');
                    //this.onRefreshPage()
                  }
                }
              ]
            });
            alert.present();        
      });


    } 
    */
  }
  private onSubmit() {

    if (this.images.length > 0) {
      this.onUpload();




    }
    else {
      //console.log("insert");

      var paramObj = {};

      paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_TENANT_FEEDBACK;

      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC] = this.LocType;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_LOC_CATG] = this.LocCatgType;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_MSG_TYPE] = this.MsgType;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_CATG] = this.CatgType;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_DETAIL] = this.inputDetail;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.picRefNo;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TITLE] = this.inputTitle;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_TEL] = this.inputTel;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_NAME] = this.inputName;
      paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_EMAIL] = this.inputEmail;
      if (this.isRequstForReply) {
        paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "Y";
      }
      else {
        paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_REPLY] = "N";
      }
      //paramObj[ConstantAttributes.PARAM_TENANT_FEEDBACK_IMAGE] = this.inputImage;


      this.coreSubmit(paramObj);

      //this.inputPassword = null;
    }

  }

  private coreSubmit(paramObj) {
    this.apiReqService.callAPIRequest<TenantFeedbackFinishBaseModel>(paramObj, true, null, true)
      .then((data: TenantFeedbackFinishBaseModel) => {
        if (data) {
          //console.log(data.lblRefNo);  
          if (data.lblRefNo == "0") {
            let alert = this.alertCtrl.create({
              //title: data.formTitle+data.lblRefNo,
              message: data.lblSubmitMsg,
              buttons: [
                {
                  text: data.btnText,
                  handler: data => {
                    ////console.log('Ok clicked, onBackToHome');
                    //this.onRefreshPage()
                  }
                }
              ]
            });
            alert.present();
          }
          else {
            let alert = this.alertCtrl.create({
              title: data.formTitle + data.lblRefNo,
              message: data.lblSubmitMsg,
              buttons: [
                {
                  text: data.btnText,
                  handler: data => {
                    ////console.log('Ok clicked, onBackToHome');
                    this.onBackToHome();
                    //this.onRefreshPage()
                  }
                }
              ]
            });
            alert.present();
          }

        }
        else {
          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();
          this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        }
      }).catch(error => {
        // this.loginFailMsg = error;                
      });
  }

  calculateImageSize(base64String) {
    let padding, inBytes, base64StringLength;
    if (base64String.endsWith("==")) padding = 2;
    else if (base64String.endsWith("=")) padding = 1;
    else padding = 0;

    base64StringLength = base64String.length;
    //console.log(base64StringLength)
    inBytes = (base64StringLength / 4) * 3 - padding;
    //console.log(inBytes);
    this.kbytes = inBytes / 1000;
    return this.kbytes;
  }

  onLocType(typeDesc: string) {
    this.LocType = typeDesc;
    ////console.log(typeDesc);
  }
  onLocCatgType(typeDesc: string) {
    this.LocCatgType = typeDesc;
    ////console.log(typeDesc);
  }
  onMsgType(typeDesc: string) {
    this.MsgType = typeDesc;
    ////console.log(typeDesc);
  }
  onCatgType(typeDesc: string) {
    this.CatgType = typeDesc;
    ////console.log(typeDesc);
  }

  private onRefreshPage() {
    //this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE,'{"entityName":"tenant-feedback-layout","requestType":"LOAD_LAYOUT_FORM","crudMode":"R"}');
    this.events.publish(ConstantAttributes.EVENT_APP_NAV_TO_PAGE, this.configSrv.TENANT_FEEDBACK_MODEL);
  }


  onInputTitle(titleDesc: string) {
    this.inputTitle = titleDesc;
    ////console.log(titleDesc);
  }

  checkTelNo() {
    //Validate Mobile No.
    var rePhone = new RegExp(this.data.validatePhoneNoPattern);
    if (!rePhone.test(this.inputTel.trim())) {
      this.step2ErrorMsg = this.data.lblInvalidPhoneNoMsg;
      return;
    }
  }
  checkEmail() {
    //Validate Email
    var reEmail = new RegExp(this.data.validateEmailPattern);
    if (!reEmail.test(this.inputEmail.trim())) {
      this.step2ErrorMsg = this.data.lblInvalidEmailMsg;
      return;
    }
  }
}
