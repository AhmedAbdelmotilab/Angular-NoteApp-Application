import { HttpInterceptorFn } from '@angular/common/http';
import { catchError , throwError } from 'rxjs';

export const errorInterceptor : HttpInterceptorFn = ( req , next ) => {
    return next ( req ).pipe ( catchError ( ( err ) => {
        // TODO : Add Toastr For Showing The Errors
        console.log ( 'ErrorFromInterceptors' , err );
        return throwError ( () => err );
    } ) );
};
