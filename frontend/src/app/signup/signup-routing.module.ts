import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './componets/signup/signup.component';
import { SignupSuccessComponent } from './componets/signup-success/signup-success.component';


const routes: Routes = [
  {
      path: '',
      component: SignupComponent
  },
  {
    path: 'success',
    component: SignupSuccessComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
