import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPassRoutingModule } from './reset-pass-routing.module';
import { ResetPassComponent } from './component/reset-pass/reset-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
const routes: Route[] = [{
  path: ':token', component: ResetPassComponent
}]

@NgModule({
  declarations: [ResetPassComponent],
  imports: [
    CommonModule,
    ResetPassRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ResetPassModule { }
