import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { NoauthGuard } from './shared/guard/noauth.guard';

const routes: Routes = [
    
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        canActivate:[]
    },
    {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),
        canActivate:[]
    },
    {
        path: 'forgot-pass',
        loadChildren: () => import('./forget-pass/forget-pass.module').then(m => m.ForgetPassModule)
    },
    {
        path: 'reset-pass',
        loadChildren: () => import('./reset-pass/reset-pass.module').then(m => m.ResetPassModule),
        canActivate:[]
    },
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
