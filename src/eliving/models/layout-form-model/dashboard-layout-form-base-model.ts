import {UserBaseModel} from '../../../framework/models/user-base-model';
import { LatestNewsFormNoticeModel } from './latest-news-form-notice-model';
import { DashboardLayoutBannerItemModel } from './dashboard-layout-form-banner-item-model';
import { DashboardLayoutDashboardItemModel } from './dashboard-layout-form-dashboard-item-model';
import { DashboardLayoutShortcutItemModel } from './dashboard-layout-form-shortcut-item-model';
import { CheckPointBaseModel } from "../../../framework/models/check-point-base-model";

export class DashboardLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    headerIconLife: CheckPointBaseModel;
    headerIconMgt: CheckPointBaseModel;

    headerItems: {
        headerImg: string;
        headerBg: string;
    }[];  
    
    bannerItems: DashboardLayoutBannerItemModel[];

    dashboardItems: DashboardLayoutDashboardItemModel[];

    shortcutItems: DashboardLayoutShortcutItemModel[];
    tcPage: CheckPointBaseModel;
}