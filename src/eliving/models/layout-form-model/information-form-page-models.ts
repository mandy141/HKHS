import { InformationFormBaseModel } from './information-form-base-model';

export class InformationFormPageModel {
    pageId: string;
    pageName: string;
    pageIndex: number;
    pageBackgroundImage: string;
    records: InformationFormBaseModel;
    
}