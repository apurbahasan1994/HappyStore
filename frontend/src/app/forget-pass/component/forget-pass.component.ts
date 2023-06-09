import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    })
  }

}
