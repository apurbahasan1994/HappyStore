import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/store';
import { getLoading, EmailPasswordCredentials, SignInEmail, SignUpEmail, IUserBase } from '@app/store/user';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  personalInfoForm: FormGroup;
  accountInfoForm: FormGroup;
  loading$: Observable<boolean>;
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      mobile: ['']
    });

    this.accountInfoForm = this.fb.group({
      street: [''],
      house: [''],
      zip: [''],
      city: [''],
      country: ['', Validators.required],
    });
  }

  nextStep(stepper: any): void {
    stepper.next();
  }

  submit(): void {
    if (this.personalInfoForm.invalid || this.accountInfoForm.invalid) {
      return;
    }
    const values: IUserBase = { ...this.personalInfoForm.value, ...this.accountInfoForm.value }
    this.store.dispatch(new SignUpEmail(values));
  }


}
