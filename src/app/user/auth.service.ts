import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from './user.model';
import { Injectable } from "@angular/core";
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AuthService {
    currentUser: IUser | undefined;

    constructor(private http: HttpClient) { }

    loginUser(userName: string, password: string) {
        const loginInfo = { username: userName, password: password };
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this.http.post('/api/login', loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data;
                console.log('login', this.currentUser)
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
    }

    isAuthenticated() {
        return this.currentUser?.success;
    }

    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')
            .pipe(tap(data => {
                if (data instanceof Object) {
                    this.currentUser = <IUser>data;
                    console.log(this.currentUser.user)
                }
            }))
            .subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string) {
        if (this.currentUser) {
            this.currentUser.user.firstName = firstName;
            this.currentUser.user.lastName = lastName;
        }

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this.http.put(`/api/users/${this.currentUser?.user.id}`, this.currentUser?.user, options)
    }

    logout() {
        this.currentUser = undefined;
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this.http.post('/api/logout', {}, options)
    }
}