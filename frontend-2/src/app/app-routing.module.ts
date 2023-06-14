import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { NoauthGuard } from './shared/guard/noauth.guard';

const routes: Routes = [
    
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        canActivate:[NoauthGuard]
    },
    {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),
        canActivate:[NoauthGuard]
    },
    {
        path: 'forgot-pass',
        loadChildren: () => import('./forget-pass/forget-pass.module').then(m => m.ForgetPassModule),
        canActivate:[NoauthGuard]
    },
    {
        path: 'reset-pass',
        loadChildren: () => import('./reset-pass/reset-pass.module').then(m => m.ResetPassModule),
        canActivate:[NoauthGuard]
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
