import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/Users/services/users.service';
import { AppState } from '@app/store';
import { IUserBase } from '@app/store/user';
import { GetUserDetails, GetUserDetailsSuccess, getLoading, getUserDetails } from '@app/store/users';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  userForm: FormGroup;
  loading$: Observable<boolean>; // Replace this with your loading indicator logic
  user: IUserBase;
  userId: string;
  user$: Observable<IUserBase>;

  constructor(private router: Router, private store: Store<AppState>, private formBuilder: FormBuilder, private route: ActivatedRoute, private userSerrvice: UsersService) { }
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    if (this.userId) {
      this.store.dispatch(new GetUserDetails(+this.userId))
      this.loading$ = this.store.pipe(select(getLoading));
      this.user$ = this.store.pipe(select(getUserDetails));
      this.getUser();
    }
    this.initForm();
  }
  getUser() {
    if (this.user) {
      return
    }
    this.user$.subscribe(data => {
      this.user = data;
      if (data) {
        this.initForm();
      }
    })
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: [this.user?.firstName ?? '', [Validators.required]],
      lastName: [this.user?.lastName ?? '', [Validators.required]],
      email: [this.user?.email ?? '', [Validators.required, Validators.email]],
      street: [this.user?.street ?? ''],
      house: [this.user?.house ?? ''],
      zip: [this.user?.zip ?? ''],
      city: [this.user?.city ?? ''],
      country: [this.user?.country ?? '', [Validators.required]],
      phone: [this.user?.phone ?? ''],
      mobile: [this.user?.mobile ?? ''],
    });
  }

  hasError(form: FormGroup, controlName: string, errorName: string): boolean {
    const control = form.get(controlName);
    return control && control.hasError(errorName);
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
  }
  onBack() {
    if(this.userId){
      this.router.navigate(['../../',],{relativeTo:this.route});
    }
    else{
      this.router.navigate(['../'],{relativeTo:this.route});
    }
  }
}
