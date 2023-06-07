import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) { }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

}
