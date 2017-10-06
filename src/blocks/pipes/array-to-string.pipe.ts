import { Pipe, PipeTransform } from '@angular/core';

/**
 * @export
 * @class ArrayToStringConverter
 */
@Pipe({
	name: 'joinStrings'
})
export class ArrayToStringConverter implements PipeTransform {

	/**
	 * Joins  array of strings
	 *
	 * @param {Array<string>} value
	 * @param {string} separator
	 * @returns
	 * @memberof ArrayToStringConverter
	 */
	transform(value: Array<string>, separator: string) {
		return value.filter(v => v !== undefined).join(separator);
	}
}