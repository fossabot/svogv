import { Pipe, PipeTransform } from '@angular/core';

/**
 * Reverse the order of a given array.
 * No further logic here, just a wrapper for reverse().
 */
@Pipe({name: 'reverseOrder'})

/**
 * Creates the ReverseOrderPipe.
 * @class
 */
export class ReverseOrderPipe implements PipeTransform {

	/**
	 * Reverse the given array.
	 * @param input - A list of object, for ex. the vehicles or the drivers list.
	 * @returns {any[]} - A new array with reversed order.
	 */
	transform(input: Array<object>): Array<object> {
		const clonedResults = [...input].reverse();
		return clonedResults;
	}
}