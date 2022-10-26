import { IUser } from './user.model';
import { Injectable } from "@angular/core";


@Injectable()
export class AuthService {
    currentUser: IUser | undefined;
    loginUser(userName: string, password: string) {
        this.currentUser = {
            id: 1,
            userName: "IrenaJura",
            firstName: "Irena",
            lastName: "Jurasek"
        }
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        if (this.currentUser) {
            this.currentUser.firstName = firstName;
            this.currentUser.lastName = lastName;
        }
    }
}