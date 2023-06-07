import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
    },
    {
        path: 'forgot-pass',
        loadChildren: () => import('./forget-pass/forget-pass.module').then(m => m.ForgetPassModule)
    },
    {
        path: 'reset-pass',
        loadChildren: () => import('./reset-pass/reset-pass.module').then(m => m.ResetPassModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
