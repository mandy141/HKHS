import { Component, Input, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { ConfigService } from '../../../../framework/services/config-service';
import { DeviceService } from '../../../../framework/services/device-service';
import { ImageSubGalleryBaseModel } from '../../../models/layout-form-model/image-sub-gallery-base-model';

@IonicPage()
@Component({
    selector: 'full-screen-gallery',
    templateUrl: 'full-screen-gallery.html'
})
export class FullScreenGallery implements AfterViewInit {
    private data: ImageSubGalleryBaseModel;
    @ViewChild('slider') slider: Slides;
    //public isLocked: boolean = false;
    sliderOptions: any;
    pagar: any;
    index: number;
  

  constructor(public navCtrl: NavController, navParams: NavParams, private configSrv: ConfigService, private deviceSrv: DeviceService, private events: Events) {
    this.data = navParams.get("data");
    this.index = navParams.get("index");

    this.sliderOptions = {
        pager: true
      };
    }

    onEvent = (event: string, item, e): void => {
        if (e) {
            e.stopPropagation();
        }
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    onDoubleClick = (e, slides: Slides):void => {
      //this.isLocked = !this.isLocked;
      //slides.lockSwipes(this.isLocked);
    }

    clickImg(openURL: string) {
      if(this.deviceSrv.isApp)
        this.configSrv.openURL(openURL);
    }

    dblClickImg(openURL: string) {
      if(!this.deviceSrv.isApp)
        this.configSrv.openURL(openURL);
    }
    
    ngAfterViewInit() {
      this.sliderOptions = {
        pager:true,
        loop: true,
        zoom:true,
        initialSlide:this.index
      };
  }
  
  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }
}
