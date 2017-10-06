import { Pipe, PipeTransform } from '@angular/core';

/**
 * Create the orderBy pipe
 */
@Pipe({
	name: 'orderBy'
})

/**
 * OrderBy class
 * Used to alter the order of a given array using specific property
 *  * @example
 * (vehicles$ | async).vehicles | orderBy:(sortedBy$ | async).current:ascending
 */
export class OrderBy implements PipeTransform {

	/**
	 * Take a source array, the orderBy key to use and the direction.
	 *
	 * @param sourceArray
	 * @param orderBy
	 * @param asc
	 * @returns {any}
	 */
	transform(sourceArray, orderBy, direction = 'DESC') {
		;
		/**
		 * Return the same array if no orderBy param provided.
		 */
		if (!orderBy || orderBy.trim() === '') {
			return sourceArray;
		}

		// Handle special cases
		let result: Array<Object> = [];
		switch (orderBy) {
			/**
			 * Vehicles without valid fuel consumption data are listed at the bottom of the list
			 * and ordered in ascending order by their registration number
			 */
			case 'fuelConsumption':
			/**
			 * SCORE: Vehicles without valid score are listed at the bottom of the list and ordered in ascending
			 * order by their registration number
			 */
			case 'score':
			/**
			 * The list is ordered by the number of days between today and the next date of the next
			 * (service) reminder for a vehicle. Vehicles without a date are listed at the bottom of the list and
			 * ordered in ascending order by their registration number.
			 */
			case 'reminderDate':
			/**
			 * Handle all the other cases (Mileage, Registration number)
			 */
			default:
				result = this.prepareFinalList(sourceArray, orderBy, direction, 'licencePlate', 'ASC');
		}
		return result;
	}

	/**
	 * Perform common sorting tasks.
	 * @param sourceArray
	 * @param orderBy
	 * @param direction
	 * @param customOrderBy
	 * @param customDirection
	 * @returns {T[]|Array<T>}
	 */
	prepareFinalList(sourceArray, orderBy, direction, customOrderBy, customDirection) {

		const faultyItemsList = this.extractAndOrderFaulty(sourceArray, orderBy, customOrderBy, customDirection);
		// Remove them from the overall list
		const cleanSourceArray = this.removeFaultyFromList(sourceArray, faultyItemsList);
		// Order the valid results
		const cleanSourceArrayOrdered = this.orderByHelper(cleanSourceArray, orderBy, direction);
		// Eventually append faulty results at the end of the valid result list
		return (faultyItemsList && faultyItemsList.length > 0) ? cleanSourceArrayOrdered.concat(faultyItemsList) : cleanSourceArrayOrdered;

	}

	/**
	 * Return a clean list, without faulty items
	 * @param sourceArray
	 * @param faultyItemsList
	 */
	removeFaultyFromList(sourceArray, faultyItemsList) {
		// Prepare a set so it's easy to filter
		const faultyItemsSet = new Set(faultyItemsList);
		// Return filtered items, all valid results
		return sourceArray.filter((item) => !faultyItemsSet.has(item));
	}

	/**
	 * Extract and collect the faulty objects
	 * Custom sort and return using the custom order and direction
	 * @param sourceArray - The original list
	 * @param orderBy - The original order by criteria
	 * @param customOrderBy - The new custom order to apply
	 * @param customDirection - The new custom directory
	 * @returns {Array<T>|Array<T>}
	 */
	extractAndOrderFaulty(sourceArray, orderBy, customOrderBy, customDirection) {
		// Consider empty as the criteria to mark an item as faulty

		const faultyItemsList = sourceArray.filter(o => [''].indexOf(o[orderBy]) !== -1);

		// Find deactivated items  and  concat them to the  previosly defined
		// faulty items  list
		const bottomItemsArray = Array.from(
			new Set(faultyItemsList.concat(sourceArray.filter(o =>  o.status === 'DEACTIVATED')))
		);

		// Order those faulty items with custom criteria and direction
		return this.orderByHelper(bottomItemsArray, customOrderBy, customDirection);
	}


	/**
	 * Iterate according to the direction
	 * @param sourceArray
	 * @param key
	 * @param direction
	 * @returns {Array<T>}
	 */
	orderByHelper(sourceArray, key, direction) {
		if (direction === 'ASC') {
			return Array.from(sourceArray).sort((item1: any, item2: any) => {
				return this.orderByComparator(item1[key], item2[key]);
			});
		} else {
			return Array.from(sourceArray).sort((item1: any, item2: any) => {
				return this.orderByComparator(item2[key], item1[key]);
			});
		}
	}

	/**
	 * Helper compare function.
	 * @param item1
	 * @param item2
	 * @returns {number}
	 */
	orderByComparator(item1: any, item2: any): number {
		if (
			((isNaN(parseFloat(item1)) || !isFinite(item1)) || (isNaN(parseFloat(item2)) || !isFinite(item2)))
			&& typeof (item1) !== 'undefined'
			&& typeof (item2) !== 'undefined') {
			// Isn't a number so lowercase the string to properly compare
			if (item1.toLowerCase() < item2.toLowerCase()) {
				return -1;
			}

			if (item1.toLowerCase() > item2.toLowerCase()) {
				return 1;
			}
		} else {
			// Parse strings as numbers to compare properly
			if (parseFloat(item1) < parseFloat(item2)) {
				return -1;
			}

			if (parseFloat(item1) > parseFloat(item2)) {
				return 1;
			}
		}
		return 0; // Equals
	}
}
