import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DemoAttributes } from './demo-attributes';
import { Events } from 'ionic-angular';
import { AppBaseModel } from '../framework/models/app-base-model';
import { MenuBaseModel } from '../framework/models/menu-base-model';
import { LoginLayoutBaseModel } from '../framework/models/layout-form-model/login-layout-form-base-model';
import { DashboardLayoutBaseModel } from '../eliving/models/layout-form-model/dashboard-layout-form-base-model';
import { UserMaintLayoutBaseModel } from '../framework/models/layout-form-model/user-maint-layout-form-base-model';
import { InputFormBaseModel } from '../framework/models/dynamic-form-model/input-form-base-model';
import { NoticeLayoutFormBaseModel } from '../eliving/models/layout-form-model/notice-layout-form-base-model';
import { FacilityBookFormBaseModel } from '../eliving/models/layout-form-model/facility-book-form-base-model';
import { MyBookingFormBaseModel } from '../eliving/models/layout-form-model/my-booking-form-base-model';
import { ActivityFormBaseModel } from '../eliving/models/layout-form-model/activity-form-base-model';
import { MeetingFormBaseModel } from '../eliving/models/layout-form-model/meeting-form-base-model';
import { BookFinishBaseModel } from '../eliving/models/layout-form-model/book-finish-base-model';
import { MyCentralFormBaseModel } from '../eliving/models/layout-form-model/my-central-form-base-model';
import { MgtFeeFormBaseModel } from '../eliving/models/layout-form-model/mgt-fee-form-base-model';
import { NotificationFormBaseModel } from '../eliving/models/layout-form-model/notification-form-base-model';
import { FloorPlanFormBaseModel } from '../eliving/models/layout-form-model/floor-plan-form-base-model';
import {  ImageGalleryBaseModel } from '../eliving/models/layout-form-model/image-gallery-base-model';
import { ImageSubGalleryBaseModel } from '../eliving/models/layout-form-model/image-sub-gallery-base-model';
import { ApplicationFormBaseModel } from '../eliving/models/layout-form-model/application-form-base-model';
import { TransportInfoFormBaseModel } from '../eliving/models/layout-form-model/transport-info-form-base-model';
import { LatestNewsFormBaseModel } from '../eliving/models/layout-form-model/latest-news-form-base-model';
import { HouseRulesFormBaseModel } from '../eliving/models/layout-form-model/house-rules-form-base-model';
import { InformationFormBaseModel } from '../eliving/models/layout-form-model/information-form-base-model';
import { ShopDirectoryFormBaseModel } from '../eliving/models/layout-form-model/shop-directory-form-base.model';
import { VisitorFinishBaseModel } from '../eliving/models/layout-form-model/visitor-finish-form-base-model';
import { VisitorRecordFormBaseModel } from '../eliving/models/layout-form-model/visitor-record-form-base-model';
import { UserNameSetupLayoutBaseModel } from '../framework/models/layout-form-model/username-setup-layout-form-base-model';
import { MyBookingRecordBaseModel } from '../eliving/models/layout-form-model/my-booking-record-base-model';
import { ClubhouseNoticeLayoutFormBaseModel } from '../eliving/models/layout-form-model/clubhouse-notice-layout-form-base-model';

@Injectable()
export class DemoService {

    constructor(private httpClient: HttpClient, private events: Events) {                
    }    

    initDemoJSONObj(): Promise<void> {
        
        //DemoAttributes.APP_JSON
        this.httpClient.get('assets/json/app.json')
            .toPromise() 
            .then(response => {               
                DemoAttributes.APP_JSON = response as AppBaseModel;
            })
            .catch(error => {                      
                this.handleError(error);  
            }); 
            
        //DemoAttributes.GUEST_MENU_JSON
        this.httpClient.get('assets/json/guest-menu.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.GUEST_MENU_JSON = response as MenuBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        }); 

        //DemoAttributes.USER_MENU_JSON
        this.httpClient.get('assets/json/user-menu.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.USER_MENU_JSON = response as MenuBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.LOGIN_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/loginForm.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.LOGIN_LAYOUT_JSON = response as LoginLayoutBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.GUEST_DASHBOARD_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/guestDashboardForm.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.GUEST_DASHBOARD_LAYOUT_JSON = response as DashboardLayoutBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.USER_DASHBOARD_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/userDashboardForm.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.USER_DASHBOARD_LAYOUT_JSON = response as DashboardLayoutBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });        

        //DemoAttributes.FORGOT_PASSWORD_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/forgotPasswordForm.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.FORGOT_PASSWORD_LAYOUT_JSON = response as UserMaintLayoutBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.CHANGE_PASSWORD_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/changePasswordForm.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.CHANGE_PASSWORD_LAYOUT_JSON = response as UserMaintLayoutBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.USERNAME_SETUP_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/usernameSetupForm.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.USERNAME_SETUP_LAYOUT_JSON = response as UserNameSetupLayoutBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.USER_REGISTRATION_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/userRegistrationForm.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.USER_REGISTRATION_LAYOUT_JSON = response as UserMaintLayoutBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });        
        
        //DemoAttributes.INPUTFORM_SBS_DESKTOP_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.sbs.personal.desktop.new.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.INPUTFORM_SBS_PERSONAL_DESKTOP_JSON = response as InputFormBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.INPUTFORM_SINGLE_ASYNC_TAB_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.test.async.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.INPUTFORM_ASYNC_JSON = response as InputFormBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });

        //DemoAttributes.INPUTFORM_ACTIVITY_DETAIL_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.activity-detail1.json')
        .toPromise() 
        .then(response => {               
            DemoAttributes.INPUTFORM_ACTIVITY_DETAIL1_JSON = response as InputFormBaseModel;
        })
        .catch(error => {                      
            this.handleError(error);  
        });
        this.httpClient.get('assets/json/dynamic-form/inputForm.activity-detail2.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_ACTIVITY_DETAIL2_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        this.httpClient.get('assets/json/dynamic-form/inputForm.activity-detail3.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_ACTIVITY_DETAIL3_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        this.httpClient.get('assets/json/dynamic-form/inputForm.activity-detail4.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_ACTIVITY_DETAIL4_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        

        //DemoAttributes.NOTICE_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/noticeForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.NOTICE_LAYOUT_JSON = response as NoticeLayoutFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });      
        
        //DemoAttributes.NOTICE_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/clubhouseNoticeForm.json')
        .toPromise()
        .then(response => {
            DemoAttributes.CLUBHOUSE_NOTICE_LAYOUT_JSON = response as ClubhouseNoticeLayoutFormBaseModel;
        })
        .catch(error => {
            this.handleError(error);
        });

        //DemoAttributes.FAC_BOOK_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/facilityBookForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FAC_BOOK_LAYOUT_JSON = response as FacilityBookFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            }); 
        
        //DemoAttributes.INPUTFORM_FAC_BOOK_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.facility.book.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_FAC_BOOK_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.MY_BOOKING_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/myBookingForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.MY_BOOKING_LAYOUT_JSON = response as MyBookingFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            }); 
        
        //DemoAttributes.ACTIVITY_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/activityForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.ACTIVITY_LAYOUT_JSON = response as ActivityFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            }); 
        
        //DemoAttributes.MEETING_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/meetingForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.MEETING_LAYOUT_JSON = response as MeetingFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.BOOK_FINISH_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/bookFinishForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.BOOK_FINISH_LAYOUT_JSON = response as BookFinishBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.BOOK_FINISH_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/myCentralForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.MY_CENTRAL_LAYOUT_JSON = response as MyCentralFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.MGT_FEE_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/mgtFeeForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.MGT_FEE_LAYOUT_JSON = response as MgtFeeFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.MGT_FEE_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/notificationForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.NOTIFICATION_LAYOUT_JSON = response as NotificationFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        //DemoAttributes.MGT_FEE_LAYOUT_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.proj-info.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_PROJ_INFO_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.FLOOR_PLAN_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/floorPlanForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_LAYOUT_JSON = response as FloorPlanFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.FLOOR_PLAN_GALLERY_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/floorPlanGallery1.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_GALLERY1_LAYOUT_JSON = response as ImageGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        this.httpClient.get('assets/json/layout-form/floorPlanGallery2.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_GALLERY2_LAYOUT_JSON = response as ImageGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        this.httpClient.get('assets/json/layout-form/floorPlanGallery3.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_GALLERY3_LAYOUT_JSON = response as ImageGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.FLOOR_PLAN_SUB_GALLERY_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/floorPlanSubGallery1.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_SUB_GALLERY1_LAYOUT_JSON = response as ImageSubGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        this.httpClient.get('assets/json/layout-form/floorPlanSubGallery2.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_SUB_GALLERY2_LAYOUT_JSON = response as ImageSubGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        this.httpClient.get('assets/json/layout-form/floorPlanSubGallery3.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_SUB_GALLERY3_LAYOUT_JSON = response as ImageSubGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        this.httpClient.get('assets/json/layout-form/floorPlanSubGallery4.json')
            .toPromise()
            .then(response => {
                DemoAttributes.FLOOR_PLAN_SUB_GALLERY4_LAYOUT_JSON = response as ImageSubGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.PHOTOBOOK_GALLERY_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/gallery.json')
            .toPromise()
            .then(response => {
                DemoAttributes.PHOTOBOOK_GALLERY_LAYOUT_JSON = response as ImageGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });

        //DemoAttributes.APPLICATION_FORM_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/applicationForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.APPLICATION_FORM_LAYOUT_JSON = response as ApplicationFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.TRANSPORT_INFO_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/transportInfo.json')
            .toPromise()
            .then(response => {
                DemoAttributes.TRANSPORT_INFO_LAYOUT_JSON = response as TransportInfoFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });

        //DemoAttributes.LATESTNEWS_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/latestnews.json')
            .toPromise()
            .then(response => {
                DemoAttributes.LATESTNEWS_LAYOUT_JSON = response as LatestNewsFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });

        //DemoAttributes.HOUSE_RULES_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/houseRulesForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.HOUSE_RULES_LAYOUT_JSON = response as HouseRulesFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });

        //DemoAttributes.INFORMATION_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/informationForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INFORMATION_LAYOUT_JSON = response as InformationFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });

        //DemoAttributes.SHOPDIRECTORY_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/shopDirectoryForm.json')
        .toPromise()
        .then(response => {
            DemoAttributes.SHOPDIRECTORY_LAYOUT_JSON = response as ShopDirectoryFormBaseModel;
        })
        .catch(error => {
            this.handleError(error);
        });

        //DemoAttributes.PHOTOBOOK_SUB_GALLERY_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/subGallery.json')
            .toPromise()
            .then(response => {
                DemoAttributes.PHOTOBOOK_SUB_GALLERY_LAYOUT_JSON = response as ImageSubGalleryBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.INPUTFORM_VISITOR_REGISTRATION_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.visitor.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_VISITOR_REGISTRATION_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.VISITOR_FINISH_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/visitorFinishForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.VISITOR_FINISH_LAYOUT_JSON = response as VisitorFinishBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.VISITOR_RECORD_LAYOUT_JSON
        this.httpClient.get('assets/json/layout-form/visitorRecordForm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.VISITOR_RECORD_LAYOUT_JSON = response as VisitorRecordFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
        //DemoAttributes.INPUTFORM_FAC_BOOK_CONFIRM_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.facility.book.confirm.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_FAC_BOOK_CONFIRM_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });

        //DemoAttributes.INPUTFORM_NOTICE_RECORD_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.notice-record1.json')
            .toPromise() 
            .then(response => {               
                DemoAttributes.INPUTFORM_NOTICE_RECORD1_JSON = response as InputFormBaseModel;
            })
            .catch(error => {                      
                this.handleError(error);  
            });
        
        //DemoAttributes.INPUTFORM_CLUBHOUSE_NOTICE_RECORD_JSON
        this.httpClient.get('assets/json/dynamic-form/inputForm.clubhouse-notice-record.json')
            .toPromise() 
            .then(response => {               
                DemoAttributes.INPUTFORM_CLUBHOUSE_NOTICE_RECORD_JSON = response as InputFormBaseModel;
            })
            .catch(error => {                      
                this.handleError(error);  
            });
        this.httpClient.get('assets/json/dynamic-form/inputForm.notice-record2.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_NOTICE_RECORD2_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        this.httpClient.get('assets/json/dynamic-form/inputForm.notice-record3.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_NOTICE_RECORD3_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        this.httpClient.get('assets/json/dynamic-form/inputForm.notice-record4.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_NOTICE_RECORD4_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        this.httpClient.get('assets/json/dynamic-form/inputForm.notice-record5.json')
            .toPromise()
            .then(response => {
                DemoAttributes.INPUTFORM_NOTICE_RECORD5_JSON = response as InputFormBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });

        //DemoAttributes.MY_BOOKING_RECORD_JSON
        this.httpClient.get('assets/json/layout-form/myBookingFormRecord.json')
            .toPromise()
            .then(response => {
                DemoAttributes.MY_BOOKING_RECORD_JSON = response as MyBookingRecordBaseModel;
            })
            .catch(error => {
                this.handleError(error);
            });
        
            
                
        return;
    }       
    
    //MISC    

    private handleError(error: any): Promise<any> {

        var errorDispMsg = "";

        if(typeof error === 'string')
            errorDispMsg =  "Load Demo JSON Error Status: " + error;
        else
        {
            //console.log(error); 
            var errorMsg = "";
            if(error.error && typeof error.error === 'string')
            {
                //console.log(error.error);                                
                errorMsg = error.error;
            } 
            else if (error.message && typeof error.message === 'string')
            {
                //console.log(error.message);  
                errorMsg = error.message;                                       
            }            

            errorDispMsg =  "Load Demo JSON Error Status: " + errorMsg;
        }       

        throw errorDispMsg;
    }
    
}