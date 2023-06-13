import { Injectable } from '@angular/core';
import { DialogComponentComponent } from '../component/dialog-component/dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../interfaces/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  dialogRef: MatDialogRef<DialogComponentComponent, any>;

  constructor(public dialog: MatDialog) { }

  open(config:DialogData) {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(DialogComponentComponent, {
      panelClass: 'app-dialog',
      data:{
        ...config
      }
    });
  }

  close() {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
