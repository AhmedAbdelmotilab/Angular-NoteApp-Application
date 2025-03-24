import { Component , inject , OnDestroy } from '@angular/core';
import { FormBuilder , FormGroup , ReactiveFormsModule , Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component ( {
    selector : 'app-login' ,
    imports : [ ReactiveFormsModule ] ,
    templateUrl : './login.component.html' ,
    styleUrl : './login.component.css'
} )
export class LoginComponent implements OnDestroy {
    /* For The Spinner */
    isLoading : boolean = false;
    /* Inject User Services To Get Login Function */
    private readonly userServices = inject ( UserService );
    /* Subscribe On Login Observable */
    subscribeSignIn : Subscription = new Subscription ();
    /* Inject Router For Navigate The User To The Home If Login Is Successfully */
    private readonly router = inject ( Router );
    /* Inject Form Builder */
    private readonly formBuilder = inject ( FormBuilder );
    /* Form Group For Login Up Form */
    loginForm : FormGroup = this.formBuilder.group (
        {
            email : [ null , [ Validators.required , Validators.email ] ] ,
            password : [ null , [ Validators.required , Validators.pattern ( /^[A-Z]\w{6,}$/ ) ] ]
        }
    );

    /* Function For Login User By Calling The Register API Service */
    userLoginIn () : void {
        if ( this.loginForm.valid ) {
            this.isLoading = true;
            this.subscribeSignIn = this.userServices.userSignIn ( this.loginForm.value ).subscribe ( {
                next : ( res ) => {
                    this.isLoading = false;
                    Swal.fire ( {
                        position : 'top-end' ,
                        icon : 'success' ,
                        title : 'Login Successfully' ,
                        showConfirmButton : false ,
                        timer : 1500
                    } );
                    console.log ( res );
                    if ( res.msg === 'done' ) {
                        /* Save The User Inside The Local Storage */
                        localStorage.setItem ( 'token' , res.token );
                        /* Decode The Token For Saving The Token Information If We Want To Use It */
                        this.userServices.saveUserData ();
                        setTimeout ( () => {
                            this.router.navigate ( [ '/home' ] );
                        } , 1000 );
                    }
                } ,
                error : () => {
                    this.isLoading = false;
                }
            } );
        } else {
            this.loginForm.markAllAsTouched ();
        }
    }

    /* Destroy The User Login Subscription */
    ngOnDestroy () {
        this.subscribeSignIn.unsubscribe ();
        console.log ( 'User Login Unsubscribe Done' );
    }
}
