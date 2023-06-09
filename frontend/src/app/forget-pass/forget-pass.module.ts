import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPassRoutingModule } from './forget-pass-routing.module';
import { ForgetPassComponent } from './component/forget-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Route, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const routes: Route[] = [{
  path: '', component: ForgetPassComponent
}]
@NgModule({
  declarations: [ForgetPassComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ForgetPassRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class ForgetPassModule { }
