import { IEvent } from './shared/event.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '../common/toastr.service';
import { Component, OnInit } from "@angular/core";
import { EventService } from "./shared/event.service";

@Component({
    template: `
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
                <event-thumbnail 
                (click)="handleThumbnailClick(event.name)"
                [event]="event"
                ></event-thumbnail>
            </div>
        </div>
    </div>
    `
})

export class EventListComponent implements OnInit {
    events: IEvent[] = [];

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.events = this.route.snapshot.data['events'];
    }

    handleThumbnailClick(eventName: string) {
        this.toastr.success(eventName);
    }
}