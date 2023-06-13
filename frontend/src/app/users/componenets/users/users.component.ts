import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUserBase } from '@app/shared/models/Backend/User';
import { AppState } from '@app/store';
import { getLoading } from '@app/store/users';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUsers from '../../../store/users';
import { Router } from '@angular/router';
import { DialogServiceService } from '@app/shared/services/dialog-service.service';
import { DialogType } from '@app/shared/interfaces/dialog';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponenet implements OnInit {
  dataSource: MatTableDataSource<IUserBase>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'country', 'street',
    'house',
    'zip',
    'city',
    'phone',
    'mobile',
    'IsAdmin','actions',];
  users: IUserBase[] = [
  ];
  isLoading$: Observable<boolean>;
  users$: Observable<IUserBase[]>;
  constructor(private dilaogService:DialogServiceService,private store: Store<AppState>,private router:Router) { }
  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(getLoading));
    this.store.dispatch(new fromUsers.GelAllUsers());
    this.getUsers();
    // this.dataSource = new MatTableDataSource<IUserBase>(this.users);
  }
  getUsers() {
    this.users$ = this.store.pipe(select(fromUsers.getUsers));
    this.users$.subscribe(data => {
      this.dataSource = new MatTableDataSource<IUserBase>(data);
    })
  }
  editUser(user: IUserBase) {
    // Handle edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: IUserBase) {
    // Handle delete functionality
    console.log('Delete user:', user);
  }
  navigateToAddUser(id:number){
    this.router.navigate(['/users/edit/',id]);
  }
  openDeleteModal(){
    this.dilaogService.open(
      {
        confirmaction: ()=>{
        },
        cancelAcction: ()=>{
        },
        payloadObject: null,
        type: DialogType.CONFIRM
      }
    );
  }
}
