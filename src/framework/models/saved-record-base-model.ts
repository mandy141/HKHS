export class SavedRecordBaseModel {     
    uniqueIdentifier: string    //Saved/Updated record        
    returnMsgTag: {              //Tags to indicate the Saved/Updated message               
        color: string;
        bgColor: string;
        label: string;
        toolTip: string;
    };           
}