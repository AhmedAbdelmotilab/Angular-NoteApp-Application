import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable ( {
    providedIn : 'root'
} )
export class UserService {

    constructor ( private httpClient : HttpClient ) { }

    userSignUp ( data : any ) : Observable<any> {
        return this.httpClient.post ( environment.baseUrl + 'users/signUp' , data );
    }

    userSignIn ( data : any ) : Observable<any> {
        return this.httpClient.post ( environment.baseUrl + 'users/signIn' , data );
    }
}
