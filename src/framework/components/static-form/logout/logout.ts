import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../services/loading-spinner-service';
import { ConstantAttributes } from '../../../attributes/constant-attributes';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, private loadingSrv: LoadingSpinnerService, private events: Events) {

  }

  ngOnInit(){
    //Logout
    this.events.publish(ConstantAttributes.EVENT_APP_SESSION_EXPIRED);
  }
}
