import { Injectable }   from '@angular/core';
import { Platform } from 'ionic-angular';
import { ConstantAttributes } from '../attributes/constant-attributes';

@Injectable()
export class DeviceService {

  public isApp: boolean;

  constructor(private platform: Platform) { 
    this.isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080') || document.URL.startsWith('http://localhost:7532'));
  }

  getScreenSize()
  {
    //Only check Screen Size
    if(window.innerWidth >= 1092)
        return ConstantAttributes.DEVICE_DESKTOP;
      else
        return ConstantAttributes.DEVICE_MOBILE;
  }

  getPlatform()
  {
    if(!this.isApp)
    {
      if (this.platform.is('core'))
        return ConstantAttributes.DEVICE_DESKTOP;
      else
        return ConstantAttributes.DEVICE_MOBILE;
    }
    else
    {
      if(this.platform.is('android'))
        return ConstantAttributes.DEVICE_ANDROID;
      else if(this.platform.is('ios'))
        return ConstantAttributes.DEVICE_IOS;
    }
  }
}