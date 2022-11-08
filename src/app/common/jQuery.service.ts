import { InjectionToken } from "@angular/core";

type EmptyObject = Record<string, unknown>;
export const JQ_TOKEN = new InjectionToken<EmptyObject>('jQuery');