import { Pipe, PipeTransform } from '@angular/core';

/**
 * Create the calculateThreshold pipe
 */
@Pipe({
	name: 'calculateThreshold'
})

/**
 * CalculateThreshold class
 * Used to alter the order of a given array using specific property
 *  * @example
 * [max-value-reference]="(sortedBy.current.showHorizontalBars) ? (vehicles | calculateThreshold:sortedBy.current.id) : 0"
 */
export class CalculateThreshold implements PipeTransform {

	/**
	 * Given a list of objects (for ex. vehicles or drivers),
	 * @param items - The list of object to iterate with
	 * @param property - The property from which extract the values, for ex. fuelConsumption, mileage, score
	 * @returns {number} - The higher value is returned and act as threshold
	 */
	transform(items, property): Number {
		// Calculate the threshold only when needed
		// Iterate through the list of items extracting one property
		// and let the math function return the highest value in the array
		return (items.length) ? Math.max(...(items.map(a => a[property]))) : 0;
	}
}
