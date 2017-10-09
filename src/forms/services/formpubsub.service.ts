import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class FormPubSubService {
	private messageSubject = new Subject<any>();

	public trigger(channel: string, data?: any): void {
		this.messageSubject.next({
			channel: channel,
			data: data || null
		});
	}

	public get(): Observable<any> {
		return this.messageSubject.asObservable();
	}
}