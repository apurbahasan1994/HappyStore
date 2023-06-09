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
    this.loading$ = this.store.pipe(select(getLoading));
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['',],
      mobile: [null, [Validators.required, Validators.minLength(11)]],
    });

    this.accountInfoForm = this.fb.group({
      street: [''],
      house: [''],
      zip: [''],
      city: [''],
      country: ['', Validators.required],
    });
  }

  get personalInfoFormControls() {
    return this.personalInfoForm.controls;
  }
  get accountInfoFormControls() {
    return this.accountInfoForm.controls;
  }

  hasError(formGroup: FormGroup, controlName: string, error: string) {
    const control = formGroup.get(controlName);
    if (!control || !control.errors) {
      return false;
    }
    return control.errors[error] && control.touched;
  }


  nextStep(stepper: any): void {
    stepper.next();
  }

  submit(): void {

    if (this.personalInfoForm.invalid || this.accountInfoForm.invalid) {
      return;
    }
    const values: IUserBase = { ...this.personalInfoForm.value, ...this.accountInfoForm.value }
    values['confirmPassword'] = this.personalInfoForm.value.password;
    this.store.dispatch(new SignUpEmail(values));
  }


}
