import { Store } from '@ngrx/store';
import { TranslateLoader } from 'ng2-translate';
import { Observable } from 'rxjs/Rx';
import { State } from '../../../../store/index';

export class PoolswiftLoader implements TranslateLoader {

	i18n$: Observable<any>;

	constructor(private store: Store<State>) {
		this.i18n$ = store.select('i18n');
	}

	getTranslation(lang: string): Observable<any> {
		return this.i18n$.skip(1);
	}
}

export function createPoolswiftLoader(store: Store<State>) {
	return new PoolswiftLoader(store);
}
