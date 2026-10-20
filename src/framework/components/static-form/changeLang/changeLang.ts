import { Component } from '@angular/core';
import { IonicPage, NavController, Events, NavParams } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../services/loading-spinner-service';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { LocalStorageService } from '../../../services/local-storage-service';
import { CheckPointBaseModel } from '../../../models/check-point-base-model';

@IonicPage()
@Component({
  selector: 'page-change-lang',
  templateUrl: 'changeLang.html'
})
export class ChangeLangPage {

  private changeLangTo: string;
  private navToCheckPoint: CheckPointBaseModel;

  constructor(private navParams: NavParams, public navCtrl: NavController, private loadingSrv: LoadingSpinnerService, private events: Events, private localStorage: LocalStorageService) {

  }

  ngOnInit(){
    if(this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS))
    {
      var additionalParams : { key: string, value: string | CheckPointBaseModel} [] = this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS);
      for(let additionalParam of additionalParams)
      {
        if(additionalParam.key == ConstantAttributes.PARAM_LANG)
        {
          this.changeLangTo = additionalParam.value as string;          
        }
        else if(additionalParam.key == ConstantAttributes.PARAM_NAV_TO_CHECKPOINT)
        {
          this.navToCheckPoint = additionalParam.value as CheckPointBaseModel;          
        }
      }
    }

    if(this.changeLangTo)
    {
      this.localStorage.setLang(this.changeLangTo); 
      this.events.publish(ConstantAttributes.EVENT_RELOAD_MENU, this.navToCheckPoint);
    }
    else
    {
      this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }    
  }
}
