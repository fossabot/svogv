import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { WidgetErrorMessages } from '../../../shared/models/widget-error-messages.m';
import { WidgetFieldProperties } from '../../../shared/models/widget-field-properties.m';
import { Widget } from '../../../shared/models/widget.m';

@Component({
	moduleId: module.id,
	selector: 'ac-editor-datepicker',
	templateUrl: 'datepicker-widget.component.html',
	styleUrls: ['datepicker-widget.component.scss']
})
export class DatepickerWidgetComponent implements OnInit, Widget {
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
	 * Adds a focus class
	 */
	isFocus: boolean;

	/**
	 * Configuration for the datepicker
	 */
	public config: IDatePickerDirectiveConfig = {
		showNearMonthDays: false,
		format: 'MM-DD-YY',
		weekDayFormat: 'dd'
	};

	public themeString = 'datepicker--cova is-directive';


	/**
	 * Add widget classes via host binding by using props.ui['ui:classes']
	 */
	@HostBinding('class') widgetClasses = '';

	/**
	 * Initialize component and set default values
	 */
	ngOnInit() {
		this.errorMessages = {
			required: `Das Feld ${this.props.title} ist erforderlich.`
		};

		this.formControl = this.props.formControl;
		this.widgetClasses = this.props.ui['ui:classes'] || '';
		this.showErrorMessage = this.props.ui['ui:inline-errors'] || false;

		this.setValue();
		this.subscribes();
	}

	/**
	 * Subscribe to current formControl value change
	 */
	subscribes(): void {
		this.formControl.valueChanges.subscribe(value => {
			this.setErrorMessage(this.formControl);
		});
	}

	/**
	 * Set value by using formControl
	 */
	setValue(): void {
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

	/**
	 * Sets the focus state
	 */
	setFocus(): void {
		this.isFocus = true;
	}

	/**
	 * Clears the focus state
	 */
	clearFocus(): void {
		this.isFocus = false;
	}

	// ngOnDestroy() {}
}