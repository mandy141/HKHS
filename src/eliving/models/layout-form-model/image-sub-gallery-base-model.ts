
import { UserBaseModel } from "../../../framework/models/user-base-model";
import { ImageSubGalleryImageModel } from "./image-sub-gallery-image-model";

export class ImageSubGalleryBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;

    fullScreenGallery: string;
    mode: string;
    images: ImageSubGalleryImageModel[];
}