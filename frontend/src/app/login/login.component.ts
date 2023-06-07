import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/store';
import { SignInEmail } from '@app/store/user/user.actions';
import { EmailPasswordCredentials } from '@app/store/user/user.models';
import { getLoading } from '@app/store/user/user.selector';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading$ : Observable<boolean>;
    constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) {
    }

    ngOnInit() {
        this.loading$ = this.store.pipe(select(getLoading));
        this.createLoginForm();
    }
    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            rememberMe: [false]
        }, {
            validators: this.repeatPassWordValidator
        });
    }

    repeatPassWordValidator(group: FormGroup): { [key: string]: boolean } {
        const password = group.get('password');
        const confirm = group.get('confirmPassword');
        return confirm.value && password.value !== confirm.value ? { repeat: true } : null;

    }

    onLogin($event: Event) {
        if (this.loginForm.invalid) {
            return;
        }
        const payload:EmailPasswordCredentials=this.loginForm.value;
        this.store.dispatch(new SignInEmail(payload));
    }

   
}
