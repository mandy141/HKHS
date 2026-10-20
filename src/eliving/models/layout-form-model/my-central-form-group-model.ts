
import { MyCentralFormDocModel } from './my-central-form-doc-model';

export class MyCentralFormGroupModel {
    
        backgroundImage: string;
        title: string;
        button: string;        
        show: boolean = false;
        documents: MyCentralFormDocModel[];    
}