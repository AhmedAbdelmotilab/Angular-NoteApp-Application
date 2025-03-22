import { ApplicationConfig , provideZoneChangeDetection } from '@angular/core';
import {
    provideRouter ,
    withHashLocation ,
    withInMemoryScrolling ,
    withViewTransitions
} from '@angular/router';

import { routes } from './app.routes';
import {
    provideClientHydration ,
    withEventReplay
} from '@angular/platform-browser';
import { provideHttpClient , withFetch , withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig : ApplicationConfig = {
    providers : [
        provideZoneChangeDetection ( { eventCoalescing : true } ) ,
        provideRouter (
            routes ,
            withInMemoryScrolling ( {
                scrollPositionRestoration : 'top'
            } ) ,
            withHashLocation () ,
            withViewTransitions ()
        ) ,
        provideClientHydration ( withEventReplay () ) ,
        provideHttpClient ( withFetch () , withInterceptors ( [ headerInterceptor , errorInterceptor ] ) )
    ]
};
