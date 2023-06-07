import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './componets/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    FormsModule,ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    SharedModule
  ]
})
export class SignupModule { }
