import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() confirmaction: () => void;
  @Input() cancelAcction: () => void;
  constructor() { }

  ngOnInit(): void {
  }
  
  onClickCancel() {
    this.cancelAcction();
  }
  onClickConfrim() {
    this.confirmaction();
  }

}
