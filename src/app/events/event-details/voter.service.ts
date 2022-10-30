import { ISession } from './../shared/event.model';
import { Injectable } from "@angular/core";

@Injectable()
export class VoterService {
    deleteVoter(session: ISession, voterName: string | undefined) {
        if (voterName) session.voters = session.voters.filter(v => v !== voterName);
    }

    addVoter(session: ISession, voterName: string | undefined) {
        if (voterName) session.voters.push(voterName);
    }

    userHasVoted(sesssion: ISession, voterName: string | undefined) {
        if (voterName) {
            return sesssion.voters.some(v => v === voterName);
        }
        return false;
    }
}