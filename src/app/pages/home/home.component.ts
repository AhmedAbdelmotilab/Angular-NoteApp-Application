import { Component , inject , OnDestroy , OnInit } from '@angular/core';
import { NoteService } from '../../core/services/note/note.service';
import { Subscription } from 'rxjs';
import { INote } from '../../core/interfaces/INote/inote';
import { FormBuilder , FormGroup , ReactiveFormsModule , Validators } from '@angular/forms';

@Component ( {
    selector : 'app-home' ,
    imports : [ ReactiveFormsModule ] ,
    templateUrl : './home.component.html' ,
    styleUrl : './home.component.css'
} )
export class HomeComponent implements OnInit , OnDestroy {
    /* User Notes */
    notes : INote[] = [] as INote[];
    /* Get Current Not ID For Updating */
    currentNoteId : string = '';
    /* Inject Note Service */
    private readonly noteServices = inject ( NoteService );
    /* Inject Form Builder */
    private readonly formBuilder = inject ( FormBuilder );
    /* Subscribe On getUserNotes */
    subscribeGetUserNotes : Subscription = new Subscription ();
    /* Subscribe On addNote */
    subscribeAddNote : Subscription = new Subscription ();
    /* Subscribe On updateNote */
    subscribeUpdateNote : Subscription = new Subscription ();
    /* Subscribe On deleteNote */
    subscribeDeleteNote : Subscription = new Subscription ();

    /* Function That Get All The Users Notes */
    getUserNotes () : void {
        this.subscribeGetUserNotes = this.noteServices.getUserNotes ().subscribe ( {
            next : ( res ) => {
                console.log ( res.notes );
                this.notes = res.notes;
                console.log ( this.notes );
            }
        } );
    }

    /* Create Form Group For Adding New Note*/
    addNoteForm : FormGroup = this.formBuilder.group ( {
        title : [ null , [ Validators.required ] ] ,
        content : [ null , [ Validators.required ] ]
    } );

    /* Create Form Group For Updating  Note*/
    updateNoteForm : FormGroup = this.formBuilder.group ( {
        title : [ null , [ Validators.required ] ] ,
        content : [ null , [ Validators.required ] ]
    } );

    /* Function That Adding New Note */
    addNote () : void {
        this.subscribeAddNote = this.noteServices.addNote ( this.addNoteForm.value ).subscribe ( {
            next : ( res ) => {
                console.log ( res );
                this.getUserNotes ();
            }
        } );
    }

    /* Function The Patch The Current Note Values To The Update Form */
    patchValue ( currentNote : any ) : void {
        this.updateNoteForm.patchValue ( currentNote );
    }

    /* Function That Updating  Note */
    updateNote () : void {
        this.subscribeUpdateNote = this.noteServices.updateNote ( this.updateNoteForm.value , this.currentNoteId ).subscribe ( {
            next : ( res ) => {
                console.log ( res );
                this.getUserNotes ();
            }
        } );
    }

    /* Function That Delete Specific Note Using The Note ID */
    deleteNote ( id : string ) : void {
        this.subscribeDeleteNote = this.noteServices.deleteNote ( id ).subscribe ( {
            next : ( res ) => {
                console.log ( res );
                this.getUserNotes ();
            }
        } );
    }

    /* Get All The Notes When We Go Inside The Component */
    ngOnInit () {
        this.getUserNotes ();
    }

    /* Destroy The Notes Service Subscription */
    ngOnDestroy () {
        this.subscribeGetUserNotes.unsubscribe ();
        console.log ( 'GetUserNotes Unsubscribe Done' );
        this.subscribeAddNote.unsubscribe ();
        console.log ( 'AddNote Unsubscribe Done' );
        this.subscribeUpdateNote.unsubscribe ();
        console.log ( 'UpdateNote Unsubscribe Done' );
        this.subscribeDeleteNote.unsubscribe ();
        console.log ( 'DeleteNote Unsubscribe Done' );
    }
}
