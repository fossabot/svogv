import { AbstractControl } from '@angular/forms';
import { WidgetErrorMessages } from './widget-error-messages.m';
import { WidgetFieldProperties } from './widget-field-properties.m';

export interface Widget {
	/**
	 * Passed props which will be added by widget-selector.component.
	 */
	props: WidgetFieldProperties;

	/**
	 * Form Control
	 */
	formControl: AbstractControl;

	/**
	 * Optional inline error message
	 */
	errorMessage?: string;

	/**
	 * Optional standard error messages object
	 */
	errorMessages?: WidgetErrorMessages;

	/**
	 * Set custom validators
	 */
	setValidators?(): void;

	/**
	 * Set current error message, for example:
	 *
	 * @param control
	 */
	setErrorMessage?(control: AbstractControl): void;
}
