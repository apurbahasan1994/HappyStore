import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, DialogType } from '@app/shared/interfaces/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent implements OnInit {
  dialogType = DialogType;
  constructor(private dialogRef: MatDialogRef<DialogComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  cancelAction() {
    this.dialogRef.close();
    this.data.cancelAcction();
  }

  confirmAction() {
    this.dialogRef.close();
    this.data.confirmaction();
  }

  get confirmConfig(){
    return this.confirmAction.bind(this);
  }
  get cancelConfig(){
    return this.cancelAction.bind(this);
  }
}


