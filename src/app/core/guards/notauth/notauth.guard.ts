import { CanActivateFn , Router } from '@angular/router';
import { inject , PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const notauthGuard : CanActivateFn = ( route , state ) => {
    const router = inject ( Router );
    const platformId = inject ( PLATFORM_ID );
    if ( isPlatformBrowser ( platformId ) ) {
        if ( localStorage.getItem ( 'token' ) ) {
            router.navigate ( [ '/home' ] );
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};
