import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MatTableModule } from '@angular/material/table';
import { UsersComponenet } from './componenets/users/users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    UsersComponenet
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatPaginatorModule
  ]
})
export class UsersModule { }
