import { Routes } from '@angular/router';

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
        title : 'Home'
    } ,
    {
        path : 'login' ,
        loadComponent : () => import('./pages/login/login.component').then (
            ( c ) => c.LoginComponent
        ) ,
        title : 'Login'
    } ,
    {
        path : 'register' ,
        loadComponent : () => import('./pages/register/register.component').then (
            ( c ) => c.RegisterComponent
        ) ,
        title : 'Register'
    } ,
    {
        path : '**' ,
        loadComponent : () => import('./shared/components/not-found/not-found.component').then (
            ( c ) => c.NotFoundComponent
        ) ,
        title : 'NotFoundPage'
    }
];
