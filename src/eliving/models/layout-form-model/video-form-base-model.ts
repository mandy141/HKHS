import { VideoFormModel } from "./video-form-model";
import { UserBaseModel } from "../../../framework/models/user-base-model";

export class VideoFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    fileIcon: string;


    RecordList: VideoFormModel[];
}