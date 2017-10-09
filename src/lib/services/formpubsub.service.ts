import { Subject } from 'rxjs/Subject';

export class FormPubSubService {
	private messageSubject = new Subject<any>();

	public trigger(channel: string, data?: any): void {
		this.messageSubject.next({
			channel: channel,
			data: data || null
		});
	}

	public get() {
		return this.messageSubject.asObservable();
	}
}