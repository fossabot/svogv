import { Pipe, PipeTransform } from '@angular/core';

/**
 * Normalize the value to fit in a 100 proportion.
 * Mainly needed in the context of generating charts.
 * @example
 * {{vehicle.reminderDate | amDateCustom:'de-DE':'without-year'}}
 */
@Pipe({
	name: 'normalizeChartValue'
})

/**
 * Creates the ChartValueNormalizer pipe.
 * @class
 */
export class ChartValueNormalizer implements PipeTransform {

	/**
	 * Calculate the value given the threshold.
	 *
	 * @param {number} value - The value to normalize
	 * @param {number} maxValueReference - The value to use as max reference
	 * @param {string} type - A context type, can be used to further customize the result
	 * @returns {number} - The normalized number.
	 */
	transform(value, maxValueReference, type) {

		/**
		 * @type {number}
		 */
		let normalizedValue: number;
		normalizedValue = 0;
		if (maxValueReference) {
			switch (type) {
				case 'score':
					/**
					 * While in the case of other values, the highest value marks the 100%,
					 * in case of the score, the value 100 marks the 100%
					 * @type {number}
					 */
					normalizedValue = value * 100 / 100;
					break;
				case 'mileage':
				case 'fuelConsumption':
				case 'reminderDates':
				case 'registrationNumber':
				default:
					normalizedValue = value * 100 / maxValueReference;
			}
		}
		return Math.round(
			Number(normalizedValue)
		);
	}
}
