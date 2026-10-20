import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { HSCImageSubGalleryBaseModel } from '../../../models/layout-form-model/hsc-image-sub-gallery-base-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';

@IonicPage()
@Component({
    selector: 'hsc-image-sub-gallery',
    templateUrl: 'hsc-image-sub-gallery.html'
})
export class HSCImageSubGallery {

    private data: HSCImageSubGalleryBaseModel;    
    videoUrl: any;

    constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
        private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private configSrv: ConfigService, private localStorage: LocalStorageService) {

    }


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

            this.apiReqService.callAPIRequest<HSCImageSubGalleryBaseModel>(paramObj, true)
                .then((_data: HSCImageSubGalleryBaseModel) => {

                    //Dismiss All Loading Spinner
                    this.loadingSrv.dismissAllLoading();

                    if (_data) {
                        this.data = _data;
                    }
                    else
                        this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
                });
        }
        else {
            this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
        }
    }

    private onBackToHome() {
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }

    onEvent = (event: string, item, e): void => {
        if (e) {
            e.stopPropagation();
        }
        if (this.events[event]) {
            this.events[event](item);
        }
    }


    private openImage(index: number)
    { 
        //console.log(this.data.mode);
        if (this.data.mode == ConstantAttributes.IMAGE_MODE_OPEN_IMAGE) {
            this.openImageViewer(this.data.images[index].image);
        } else
        { 
            this.openImageSlider(index);
        }

    }


    openImageViewer(openURL: string) {
        this.configSrv.openImgNotShare(openURL);
    }


    openImageSlider = (index: number): any => {        
        this.navCtrl.push(this.data.fullScreenGallery, {
            'data': this.data,
            'index': index
        });
    }

    isLoggedIn() : boolean
    {
        var curUser = this.localStorage.getUser();
        ////console.log('curUser');
        ////console.log(curUser);
        if(curUser)
        {
        if(curUser.token == this.configSrv.GUEST_MODEL.token)
            return false;
        else
            return true;
        }
        else
        return false;
    }

}
