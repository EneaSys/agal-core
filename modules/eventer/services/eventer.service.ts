import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum AgalEventType {
	OTHER, RELOAD, START_LOADING, END_LOADING, MESSAGE
}

export interface AgalEvent {
	type: AgalEventType,
	data?: any,
}

export interface AgalEventMessage {
	severity: string,
	text: string,
	duration: number
}

@Injectable({ providedIn: 'root' })
export class AgalEventerService {

	private eventSubject$ = new Subject<AgalEvent>();

	onEvent() {
		return this.eventSubject$.asObservable();
	}

	launchEvent(data: AgalEvent) {
		this.eventSubject$.next(data);
	}

	launchReloadContent(data: any = {}) {
		this.eventSubject$.next({
			type: AgalEventType.RELOAD,
			data: data
		});
	}

	launchMessage(message: AgalEventMessage) {
		this.eventSubject$.next({
			type: AgalEventType.MESSAGE,
			data: message
		});
	}

	loadingStart() {
		this.eventSubject$.next({
			type: AgalEventType.START_LOADING
		});
	}

	loadingEnd() {
		this.eventSubject$.next({
			type: AgalEventType.END_LOADING
		});
	}
}