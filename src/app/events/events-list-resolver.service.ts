import { EventService } from './shared/event.service';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

@Injectable()
export class EventsListResolver implements Resolve<any> {
    constructor(private eventService: EventService) { }

    resolve() {
        return this.eventService.getEvents()
    }
}