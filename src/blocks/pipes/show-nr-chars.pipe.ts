import { Pipe, PipeTransform } from '@angular/core';

/**
 * Show only  a number of chars from a  string and replace the rest with
 * a  new given string
 * @export
 * @class ShowNumberOfChars
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'showNrChars'
})
export class ShowNumberOfChars implements PipeTransform {

    /**
     * Transform the given  string.
     * @param {string} value
     * @param {number} chars
     * @param {string} replaceBy
     * @returns {String}
     * @memberof ShowNumberOfChars
     */
	transform(value: string, chars: number, replaceBy: string): String {
		return value.substring(0, chars) + replaceBy;
	}
}