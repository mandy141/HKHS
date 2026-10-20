import { CheckPointBaseModel } from "../../../framework/models/check-point-base-model";

export class DashboardLayoutDashboardItemModel {
    backgroundImage: string;
    title: string;
    button: string;
    openForm: CheckPointBaseModel;
    iconFile: string;
    iconForm: string;
    records: {
        desc: string;
        height: string;
        fileURL: string;
        openDtlForm: CheckPointBaseModel;
    }[];
}