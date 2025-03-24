import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable ( {
    providedIn : 'root'
} )
export class UserService {
    userData : any = null;

    constructor ( private httpClient : HttpClient ) { }

    userSignUp ( data : any ) : Observable<any> {
        return this.httpClient.post ( environment.baseUrl + 'users/signUp' , data );
    }

    userSignIn ( data : any ) : Observable<any> {
        return this.httpClient.post ( environment.baseUrl + 'users/signIn' , data );
    }

    saveUserData () : void {
        if ( localStorage.getItem ( 'token' ) ) {
            this.userData = jwtDecode ( localStorage.getItem ( 'token' )! );
        }
    }
}
