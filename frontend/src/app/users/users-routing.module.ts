import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponenet } from './componenets/users/users.component';
import { AddUsersComponent } from './componenets/add-users/add-users.component';


const routes: Routes = [
  {
    path:'',
    component:UsersComponenet
  },
  {
    path:'edit/:userId',
    component:AddUsersComponent
  },
  {
    path:'add-user',
    component:AddUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
