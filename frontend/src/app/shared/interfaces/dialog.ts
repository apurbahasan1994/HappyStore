export interface DialogData {
    confirmaction:()=>void;
    cancelAcction:()=>void;
    payloadObject:any;
    type:DialogType
}

export enum DialogType{
    CONFIRM = "confirmation"
}