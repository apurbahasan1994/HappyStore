import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-component-wrapper',
  templateUrl: './auth-component-wrapper.component.html',
  styleUrls: ['./auth-component-wrapper.component.scss']
})
export class AuthComponentWrapperComponent implements OnInit {
  @Input() imageUrl: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
