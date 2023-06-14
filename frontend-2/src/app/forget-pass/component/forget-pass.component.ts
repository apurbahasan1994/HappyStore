import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/store';
import { getLoading } from '@app/store/user';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../store/user';
@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {
  forgotPassForm: FormGroup;
  isLoading$:Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(getLoading));
    this.createForm();
  }
  createForm() {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    })
  }
  onSbmit(){
    if(this.forgotPassForm.invalid){
      return;
    }
    this.store.dispatch(new fromUser.ForgotPassEmail(this.forgotPassForm.value));
  }

}
