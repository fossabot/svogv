import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from 'ng2-translate';

/**
 * Instantiate moment so can be used later on.
 *
 *  @type {object}
 */
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

/**
 * Handle date localization and custom presentation.
 *
 * Usage example:
 *   value | amDateCustom:'without-year'
 */
@Pipe({name: 'amDateCustom'})

/**
 * Creates the DateCustomPipe pipe.
 * @class
 */
export class DateCustomPipe implements PipeTransform {

	private currentLocale: string;

	constructor(private translate: TranslateService) {
		this.currentLocale = translate.currentLang.substring(0, 2);
	}

	/**
	 * Return a formatted and localized date
	 *
	 * @param {(Date|Moment|string|number)} Date - The date source
	 * @param {string} formatter - The custom format to apply
	 * @param {any[]} args - Optional parameters
	 *
	 * @return {string} The custom formatted date
	 */
	transform(value: Date | moment.Moment | string | number, formatter: string, ...args: any[]): string {


		// Localize
		moment.locale(this.currentLocale, this.translateMomentCalendar(this.currentLocale));

		// Return empty string when no value provided
		if (!value) {
			return '';
		}


		/**
		 * @type {string}
		 */
		let format: string;

		/**
		 * Handle very specific cases, for each language.
		 * Use https://en.wikipedia.org/wiki/Date_format_by_country as reference.
		 */
		switch (formatter) {
			/**
			 * In some cases (see for ex. the vehicles list) we show the date split in two formatted lines, where the
			 * first one contains just day and month, therefore we have to use custom formats.
			 */
			case 'without-year':
				switch (this.currentLocale) {
					case 'de':
						format = 'DD.MM.';
						break;
					case 'it':
						format = 'DD/MM';
						break;
					case 'es':
						format = 'DD/MM';
						break;
					case 'fr':
						format = 'DD/MM';
						break;
					case 'sv':
						format = 'MM-DD';
						break;
					case 'no':
						format = 'DD.MM.';
						break;
					case 'cs':
						format = 'DD. MM. ';
						break;
					default:
						format = 'MM-DD';
				}
				break;
			/**
			 * In other cases (see the driver logbook details) we show just the current day as "Today" and the day
			 * before as "Yesterday"
			 */
			case 'todayYesterday':
				const date = momentConstructor(value);
				if (moment().diff(date, 'days') === 0 || moment().diff(date, 'days') === 1) {
					return date.calendar();
				} else {
					format = 'L';
				}
				break;
			default:
				format = formatter;
		}
		return momentConstructor(value).locale(this.currentLocale).format(format);
	}

	/**
	 * Given the current locale, it returns a custom moment calendar strings.
	 * @param currentLocale
	 * @returns {Object}
	 */
	translateMomentCalendar(currentLocale: string): object {
		let translatedCalendar = {};
		switch (currentLocale) {
			case 'de':
				translatedCalendar = {
					calendar: {
						lastDay: '[Gestern]',
						sameDay: '[Heute]',
						nextDay: '[Morgen]',
						lastWeek: 'DD.MM.YYYY',
						sameElse: 'DD.MM.YYYY'
					}
				};
				break;
			case 'it':
				translatedCalendar = {
					calendar: {
						lastDay: '[Ieri]',
						sameDay: '[Oggi] ',
						nextDay: '[Domani]',
						lastWeek: 'DD/MM/YYYY',
						sameElse: 'DD/MM/YYYY'
					}
				};
				break;
			case 'es':
				translatedCalendar = {
					calendar: {
						lastDay: '[Ayer]',
						sameDay: '[Hoy] ',
						nextDay: '[Mañana]',
						lastWeek: 'DD/MM/YYYY',
						sameElse: 'DD/MM/YYYY'
					}
				};
				break;
			case 'fr':
				translatedCalendar = {
					calendar: {
						lastDay: '[Hier]',
						sameDay: '[Aujourd\'hui] ',
						nextDay: '[Demain]',
						lastWeek: 'DD/MM/YYYY',
						sameElse: 'DD/MM/YYYY'
					}
				};
				break;
			case 'sv':
				translatedCalendar = {
					calendar: {
						lastDay: '[I går]',
						sameDay: '[I dag] ',
						nextDay: '[I morgon]',
						lastWeek: 'MM-DD-YYYY',
						sameElse: 'MM-DD-YYYY'
					}
				};
				break;
			case 'no':
				translatedCalendar = {
					calendar: {
						lastDay: '[I går]',
						sameDay: '[I dag] ',
						nextDay: '[I morgen]',
						lastWeek: 'DD.MM.YYYY',
						sameElse: 'DD.MM.YYYY'
					}
				};
				break;
			case 'cs':
				translatedCalendar = {
					calendar: {
						lastDay: '[Včera]',
						sameDay: '[Dnes] ',
						nextDay: '[Zítra]',
						lastWeek: 'DD. MM. YYYY',
						sameElse: 'DD. MM. YYYY'
					}
				};
				break;
			default:
				translatedCalendar = {
					calendar: {
						lastDay: '[Yesterday]',
						sameDay: '[Today] ',
						nextDay: '[Tomorrow]',
						lastWeek: 'MM-DD-YYYY',
						sameElse: 'MM-DD-YYYY'
					}
				};
		}
		return <object>translatedCalendar;
	}
}
