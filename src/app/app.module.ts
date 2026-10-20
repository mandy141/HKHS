  import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LoadingSpinnerService }    from '../framework/services/loading-spinner-service';
import { LocalStorageService }    from '../framework/services/local-storage-service';
import { DeviceService }    from '../framework/services/device-service';
import { ConfigService } from '../framework/services/config-service';
import { DemoService }    from '../demo/demo-service';

import { CookieService } from 'ngx-cookie-service';

import { errorProvider } from '../framework/helpers/error.interceptor';
import { jwtProvider } from '../framework/helpers/jwt.interceptor';
import { fakeBackendProvider } from '../demo/fake-backend-interceptor';
import { debugProvider } from '../framework/helpers/debug-interceptor';
import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';

//import { OneSignal, OneSignalOriginal } from '@ionic-native/onesignal';
import OneSignal, { OneSignalPlugin } from 'onesignal-cordova-plugin';

import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';

import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { FileOpener } from '@ionic-native/file-opener';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64'

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'custom-back',
      mode: 'md'
    },
  ),
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    PhotoViewer,
    //OneSignal,
    OneSignalPlugin,
    Network,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceService,
    ConfigService,
    LoadingSpinnerService,
    LocalStorageService,
    CookieService,
    DemoService,
    Base64,
    ImagePicker,
    Camera,
    /*
    Http Interceptors, Run in the following orders
    */
    //Interceptor to attach JWT
    jwtProvider,
    //Interceptor to handle HTTP Error Return
    errorProvider,
    //Interceptor for printing request & response to console when run in localhost
    debugProvider,
    //Interceptor used to create fake backend
    //fakeBackendProvider, // if change to real please comment
    SocialSharing,
    InAppBrowser,
    MobileAccessibility,
    ScreenOrientation,
    FileTransfer,
    FileTransferObject,
    File,
    FileOpener,
    AndroidPermissions
  ]
})
export class AppModule {}
