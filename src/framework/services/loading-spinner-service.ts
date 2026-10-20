import { Injectable } from '@angular/core';
import { LoadingController, Loading, Config } from 'ionic-angular';
import { LocalStorageService } from './local-storage-service';
import { ConstantAttributes } from '../attributes/constant-attributes';
import { ConfigService } from './config-service';

@Injectable()
export class LoadingSpinnerService {
    
    loadingSpinnerCnt: number = 0;
    loading: Loading = null;

    constructor(private loadingCtrl: LoadingController, private localStorage: LocalStorageService, private configSrv: ConfigService) {        
    } 

    createLoadingSpinner()
    {
        if(!this.loading)
        {
            this.loading = this.loadingCtrl.create({
                spinner: 'ios',
                content: ''//this.getWaitingMsg()           
              });

            this.loading.present();
        }

        this.loadingSpinnerCnt += 1;
    }

    getWaitingMsg()
    {
        if(this.localStorage.getLang() == ConstantAttributes.LANG_CHI)
            return this.configSrv.MSG_PLEASE_WAIT_CHI;
        else
            return this.configSrv.MSG_PLEASE_WAIT_ENG;
    }

    dismissLoading()
    {
        if(this.loading)
        {
            this.loadingSpinnerCnt -= 1; 

            if(this.loadingSpinnerCnt <= 0)
            {
                this.loadingSpinnerCnt = 0;
                this.loading.dismiss();
                this.loading = null;
            }
        }
    }

    dismissAllLoading()
    {
        if(this.loading)
        {
            this.loadingSpinnerCnt = 0;
            this.loading.dismiss();
            this.loading = null;
        }
    }
}