import { UserBaseModel } from "../../../framework/models/user-base-model";
import { TenantFeedbackLayoutLocationItemsModel} from './tenant-feedback-layout-locationItem-model'
import { TenantFeedbackLayoutLocationCatgItemsModel} from './tenant-feedback-layout-locationCatgItem-model'
import { TenantFeedbackLayoutCatgItemsModel} from './tenant-feedback-layout-catgItem-model'
import { TenantFeedbackLayoutMessageItemsModel} from './tenant-feedback-layout-msgItem-model'
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';

export class TenantFeedbackLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    formTitle1: string;
    formTitle2: string;
    nextText: string;
    backText: string;
    submitText: string;
    locationText: string;
    locationCatgText:string;
    messageItemText: string;
    catgText: string;
    detailText: string;
    addImageText: string;
    titleText: string;
    sirText: string;
    madamText: string;
    nameText: string;
    telText: string;
    emailText: string;
    requestForReplyText: string;
    remarkText: string;
    cancelText: string;
    takePhotoText: string;
    fromGalleryText: string;
    maximumImagesCount: number;
    validatePhoneNoPattern: string;
    validateEmailPattern: string;
    lblInvalidEmailMsg: string;
    lblInvalidPhoneNoMsg: string;
    cameraPicQuality: number;
    cameraPicHeight: number;
    galleryPicQuality: number;
    galleryPicHeight: number;
    errorPicMsg: string;
    errorMaxPicMsg: string;
    btnText: string;
    locationItems: TenantFeedbackLayoutLocationItemsModel;
    locationCatgItems: TenantFeedbackLayoutLocationCatgItemsModel;
    messageItems: TenantFeedbackLayoutMessageItemsModel;
    catgItems: TenantFeedbackLayoutCatgItemsModel;
    recordList: CheckPointBaseModel;
}