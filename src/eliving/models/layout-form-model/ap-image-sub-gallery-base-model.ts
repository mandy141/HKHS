
import { UserBaseModel } from "../../../framework/models/user-base-model";
import { APImageSubGalleryImageModel } from "./ap-image-sub-gallery-image-model";

export class APImageSubGalleryBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;

    fullScreenGallery: string;
    mode: string;
    images: APImageSubGalleryImageModel[];
}