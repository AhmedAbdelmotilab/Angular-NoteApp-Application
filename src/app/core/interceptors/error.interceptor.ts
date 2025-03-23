import { HttpInterceptorFn } from '@angular/common/http';
import { catchError , throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor : HttpInterceptorFn = ( req , next ) => {
    return next ( req ).pipe ( catchError ( ( err ) => {
        Swal.fire ( {
            icon : 'error' ,
            title : 'Oops...' ,
            text : err.error.msg
        } );
        return throwError ( () => err );
    } ) );
};
