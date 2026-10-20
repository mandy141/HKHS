import { CheckPointBaseModel } from "./check-point-base-model";
import { SavedRecordBaseModel } from "./saved-record-base-model";

export class SavedResultBaseModel {     
    savedRecords:SavedRecordBaseModel[];    
    
    //For Input Form Submit
    inputFormPerformCallback: boolean;            //Call back the previous page function. E.g. Force Data List Reload in Enquiry Page
    inputFormNextAction: string;         //"POP","POP-TO-ROOT","NAV"
    inputFormNextForm: CheckPointBaseModel;   //Destination if NAV
}