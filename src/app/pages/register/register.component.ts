import { Component , inject , OnDestroy } from '@angular/core';
import { FormBuilder , FormGroup , ReactiveFormsModule , Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component ( {
    selector : 'app-register' ,
    imports : [ ReactiveFormsModule ] ,
    templateUrl : './register.component.html' ,
    styleUrl : './register.component.css'
} )
export class RegisterComponent implements OnDestroy {
    /* For The Spinner */
    isLoading : boolean = false;
    /* Inject The User Service To Execute The SignUp Method*/
    private readonly userService = inject ( UserService );
    /* Subscribe On The SignUp Observable */
    subscribeSignUp : Subscription = new Subscription ();
    /* Inject Router To Redirect The User To The Login Page After Success Register */
    private readonly router = inject ( Router );
    /*  Inject Form Builder */
    formBuilder = inject ( FormBuilder );
    /* Create The Form Group */
    registerForm : FormGroup = this.formBuilder.group (
        {
            name : [ null , [ Validators.required , Validators.minLength ( 3 ) , Validators.maxLength ( 20 ) ] ] ,
            email : [ null , [ Validators.required , Validators.email ] ] ,
            password : [ null , [ Validators.required , Validators.pattern ( /^[A-Z]\w{6,}$/ ) ] ] ,
            age : [ null , [ Validators.required , Validators.pattern ( /^(1[0-9]|[2-7][0-9]|80)$/ ) ] ] ,
            phone : [ null , [ Validators.required , Validators.pattern ( /^01[0125][0-9]{8}$/ ) ] ]
        }
    );

    /* Function For Register User By Calling The Register API Service */
    userRegister () : void {
        if ( this.registerForm.valid ) {
            this.isLoading = true;
            this.subscribeSignUp = this.userService.userSignUp ( this.registerForm.value ).subscribe ( {
                next : ( res ) => {
                    if ( res.msg === 'done' ) {
                        this.isLoading = false;
                        Swal.fire ( {
                            position : 'top-end' ,
                            icon : 'success' ,
                            title : 'Register Successfully' ,
                            showConfirmButton : false ,
                            timer : 1500
                        } );
                        setTimeout ( () => {
                            this.router.navigate ( [ '/login' ] );
                        } , 1000 );
                    }
                } ,
                error : () => {
                    this.isLoading = false;
                }
            } );
        } else {
            this.registerForm.markAllAsTouched ();
        }
    }

    /* Destroy The User Register Subscription */
    ngOnDestroy () {
        this.subscribeSignUp.unsubscribe ();
        console.log ( 'User Register Unsubscribe Done' );

    }
}
