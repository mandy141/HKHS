
import { UserBaseModel } from "../../../framework/models/user-base-model";
import { ImageGalleryGroupModel } from "./image-gallery-group-model";

export class ImageGalleryBaseModel {
    userIdentity: UserBaseModel;
    componentName: string;
    entityName: string;
    crudMode: string;
    headerImage: string;
    selectAll: string;
    cancelText: string;
    lblYear: string;
    formTitle: string;

    imageGroups: ImageGalleryGroupModel[];
}