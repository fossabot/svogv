import { Component, HostBinding, OnInit } from '@angular/core';
/**
 * The EmailValidator directive is only used in markup as decribed in :
 * https://angular.io/api/forms/EmailValidator
 * Lint is here disabled in order to avoid the error:
 * no-unused-variable  Unused import: 'EmailValidator'
 */
/*tslint:disable-next-line*/
import { AbstractControl , EmailValidator } from '@angular/forms';
import { WidgetErrorMessages } from '../../../shared/models/widget-error-messages.m';
import { WidgetFieldProperties } from '../../../shared/models/widget-field-properties.m';
import { Widget } from '../../../shared/models/widget.m';

@Component({
	moduleId: module.id,
	selector: 'ac-editor-radio',
	templateUrl: 'radio-widget.component.html',
	styleUrls: ['radio-widget.component.scss']
})
export class RadioWidgetComponent implements OnInit, Widget {
	/**
	 * Passed props which will be added by widget-selector.component.
	 * Important note: You can not use the props in the constructor() function.
	 */
	props: WidgetFieldProperties;

	/**
	 * Abstract Control
	 * The value will be assigned by using props.formControl
	 */
	formControl: AbstractControl;

	/**
	 * Standard error message object which can be easily used to set custom error message.
	 */
	errorMessages: WidgetErrorMessages;

	/**
	 * Error message which will be displayed.
	 */
	errorMessage: string;

	/**
	 * Show inline error message by using UISchema.
	 */
	showErrorMessage: boolean;

	/**
	 * Input type coming from UI Schema
	 */
	inputType: string;

	/**
	 * Add widget classes via host binding by using props.ui['ui:classes']
	 */
	@HostBinding('class') widgetClasses = '';

	/**
	 * Initialize component and set default values
	 */
	ngOnInit() {
		this.errorMessages = {
			required: `Das Feld ${this.props.title} ist erforderlich.`,
		};

		this.formControl = this.props.formControl;
		this.widgetClasses = this.props.ui['ui:classes'] || '';
		this.showErrorMessage = this.props.ui['ui:inline-errors'] || false;
		this.inputType = this.props.schema.format || 'text';

		this.setValue();
		this.subscribes();
	}

	/**
	 * Subscribe to current formControl value change
	 */
	subscribes(): void {
		this.formControl.valueChanges.subscribe(value =>
			this.setErrorMessage(this.formControl)
		);
	}

	/**
	 * Set value by using formControl
	 */
	setValue(): void {
		console.log('setValue: ', 1);
		if (this.props.formData.value) {
			this.formControl.setValue(this.props.formData.value);
		}
	}

	/**
	 * Generic error message setter function
	 *
	 * @param {AbstractControl} control - Check current control
	 */
	setErrorMessage(control: AbstractControl): void {
		this.errorMessage = '';

		if ((control.touched || control.dirty) && control.errors) {
			this.errorMessage = Object.keys(control.errors).map((errorMsg) => {
				return this.errorMessages[errorMsg];
			})
			.join(' ');
		}
	}

	// ngOnDestroy() {}
}