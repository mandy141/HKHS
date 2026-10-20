import {UserBaseModel} from '../../../framework/models/user-base-model';
import { ImageGalleryGroupModel } from "./image-gallery-group-model";
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';

export class ActivingMediaRecordModel {
    uniqueIdentifier: number;
    groupName: string;
    title: string;
    image: string;
    noOfImage: string;
}