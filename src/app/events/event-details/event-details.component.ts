import { IEvent, ISession } from './../shared/event.model';
import { Component, OnInit } from "@angular/core";
import { EventService } from "../shared/event.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './event-details.component.html',
    styles: [` 
        .container { padding: 0 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer; }
    `]
})

export class EventDetailsComponent implements OnInit {
    event = {} as IEvent;
    addMode = false;
    filterBy = 'all';
    sortBy = 'votes';

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.data.forEach((data) => {
            this.event = data['event'];
            this.addMode = false;
        })
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: ISession) {
        const nextId = Math.max.apply(this.event.sessions.map((s: any) => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }
}