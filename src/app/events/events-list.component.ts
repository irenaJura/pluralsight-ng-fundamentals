import { IEvent } from './shared/event.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";

@Component({
    template: `
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
                <event-thumbnail [event]="event"></event-thumbnail>
            </div>
        </div>
    </div>
    `
})

export class EventListComponent implements OnInit {
    events: IEvent[] = [];

    constructor(
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.events = this.route.snapshot.data['events'];
    }
}