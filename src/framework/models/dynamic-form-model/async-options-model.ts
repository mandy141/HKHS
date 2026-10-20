import { UserBaseModel } from "../user-base-model";

export class AsyncOptionsModel {
    userIdentity: UserBaseModel;
    selectedKey: string;    //For Radio / Drop Down List
    selectedKeys: string[];   //For Check List
    options: {
        //For Ionic DropDown / Radio / CheckList
        key: string,         
        disable: boolean,
        contents: {
            class: string,
            style: string,
            desc: string
        }[]
    }[] = [];
}