import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { notauthGuard } from './core/guards/notauth/notauth.guard';

export const routes : Routes = [
    {
        path : '' ,
        redirectTo : 'home' ,
        pathMatch : 'full'
    } ,
    {
        path : 'home' ,
        loadComponent : () =>
            import('./pages/home/home.component').then (
                ( c ) => c.HomeComponent
            ) ,
        title : 'Home' ,
        canActivate : [ authGuard ]
    } ,
    {
        path : 'login' ,
        loadComponent : () => import('./pages/login/login.component').then (
            ( c ) => c.LoginComponent
        ) ,
        title : 'Login' ,
        canActivate : [ notauthGuard ]
    } ,
    {
        path : 'register' ,
        loadComponent : () => import('./pages/register/register.component').then (
            ( c ) => c.RegisterComponent
        ) ,
        title : 'Register' ,
        canActivate : [ notauthGuard ]
    } ,
    {
        path : '**' ,
        loadComponent : () => import('./shared/components/not-found/not-found.component').then (
            ( c ) => c.NotFoundComponent
        ) ,
        title : 'NotFoundPage'
    }
];
