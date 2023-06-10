import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '@app/store';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../../../store/user'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  resetForm: FormGroup;
  token:string='';
  loading$:Observable<boolean>;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) { }
  ngOnInit(): void {
    this.loading$=this.store.pipe(select(fromUser.getLoading));
    this.token = this.route.snapshot.params['token'];
    this.createForm();
  }
  createForm() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  onsubmit() {
    if (this.resetForm.invalid) {
      return;
    }
    this.store.dispatch(new fromUser.ResetPassword(this.resetForm.value.password, this.token))
  }

}
