import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEvent, ISession } from './event.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EventService {
    constructor(private http: HttpClient) { }

    getEvents(): Observable<IEvent[]> {
        return this.http.get<IEvent[]>('/api/events')
            .pipe(catchError(this.handleError<IEvent[]>('getEvents', [])))
    }

    getEvent(id: number): Observable<IEvent> {
        return this.http.get<IEvent>('/api/events/' + id)
            .pipe(catchError(this.handleError<IEvent>('getEvent', {} as IEvent)))
    }

    saveEvent(event: IEvent) {
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<IEvent>('/api/events', event, options)
            .pipe(catchError(this.handleError<IEvent>('saveEvent')))
    }

    searchSessions(searchTerm: string): Observable<ISession[]> {
        return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm)
            .pipe(catchError(this.handleError<ISession[]>('searchSessions', {} as ISession[])))
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}