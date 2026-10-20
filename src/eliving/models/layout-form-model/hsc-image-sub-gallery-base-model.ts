
import { UserBaseModel } from "../../../framework/models/user-base-model";
import { HSCImageSubGalleryImageModel } from "./hsc-image-sub-gallery-image-model";

export class HSCImageSubGalleryBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;

    fullScreenGallery: string;
    mode: string;
    images: HSCImageSubGalleryImageModel[];
}