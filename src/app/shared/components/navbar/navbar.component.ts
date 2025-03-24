import { Component , inject , OnInit , PLATFORM_ID } from '@angular/core';
import { Router , RouterLink , RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component ( {
    selector : 'app-navbar' ,
    imports : [
        RouterLink ,
        RouterLinkActive
    ] ,
    templateUrl : './navbar.component.html' ,
    styleUrl : './navbar.component.css'
} )
export class NavbarComponent implements OnInit {
    private readonly platformId = inject ( PLATFORM_ID );
    private readonly router = inject ( Router );
    isLogIn : boolean = false;

    ngOnInit () {
        if ( isPlatformBrowser ( this.platformId ) ) {
            if ( localStorage.getItem ( 'token' ) ) {
                this.isLogIn = true;
            }
        }
    }

    logOut () : void {
        if ( isPlatformBrowser ( this.platformId ) ) {
            localStorage.removeItem ( 'token' );
            this.router.navigate ( [ '/login' ] );
        }
    }
}
