import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State } from '../../../../store/index';

/*
 * Get the current value out of the i18n object
 * in the current language
 * by using the key of the object
 * and the reference to a specific section of your translation.
 * Usage:
 *   key | i18n:registration
 * Example:
 *   {{ key |  i18n:registration }}
 *   leads to: Translated value
 */
@Pipe({
	name: 'i18n',
	pure: true
})
export class I18nPipe implements PipeTransform {
	i18n$: Observable<any>;

	constructor(private store: Store<State>) {
		this.i18n$ = store.select('i18n');
	}

	transform(key: string, store: any): any {

		console.log('store in translate: ', store, key);
		if (!store) {
			return key;
		}

		if (this.i18n$[store][key]) {
			return this.i18n$[store][key];
		} else {
			return key;
		}
	}
}