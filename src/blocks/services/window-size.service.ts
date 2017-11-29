import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

export class WindowSizeService {
	width$: Observable<number>;

	/**
	 * Observable.fromEvent(..) registers an event handler for every subscriber separately.
	 * With them, there is only one event handler behind the scenes, the latest value is being kept and just passed
	 * to every new subscriber to that stream.
	 */

	constructor() {
		const windowSize$ = new BehaviorSubject(this.getWindowSize());
		this.width$ = ((<any>windowSize$).pluck('width') as Observable<number>).distinctUntilChanged();

		Observable.fromEvent(window, 'resize')
			.debounceTime(250)
			.map(this.getWindowSize)
			.subscribe(windowSize$);
	}

	getWindowSize() {
		return {
			width: window.innerWidth
		};
	}
}