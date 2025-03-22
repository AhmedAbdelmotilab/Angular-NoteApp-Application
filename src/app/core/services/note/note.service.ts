import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable ( {
    providedIn : 'root'
} )
export class NoteService {

    constructor ( private httpClient : HttpClient ) { }

    addNote ( data : any ) : Observable<any> {
        return this.httpClient.post ( environment.baseUrl + 'notes' , data );
    }

    getNotes () : Observable<any> {
        return this.httpClient.get ( environment.baseUrl + 'notes/allNotes' );
    }

    getUserNotes () : Observable<any> {
        return this.httpClient.get ( environment.baseUrl + 'notes' );
    }

    updateNote ( data : any , noteId : any ) : Observable<any> {
        return this.httpClient.put ( environment.baseUrl + `notes/${ noteId }` , data );
    }

    deleteNote ( noteId : any ) : Observable<any> {
        return this.httpClient.delete ( environment.baseUrl + `notes/${ noteId }` );
    }

}
