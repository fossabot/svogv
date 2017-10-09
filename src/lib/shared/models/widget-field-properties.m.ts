import { FormControl, FormGroup } from '@angular/forms';

export interface WidgetFieldProperties {
	/**
	 * Generic elements available in JSON Schema
	 */
	schema: any;
	ui?: any;
	formData?: any;

	/**
	 * Path to level of JSON object
	 */
	path: 'string';
	/**
	 * Label or title of element
	 */
	title: 'string';
	/**
	 * Id of input and for element
	 */
	id: 'string';
	/**
	 * Root form
	 */
	rootForm: FormGroup;
	/**
	 * Parent FormGroup
	 */
	parentFormGroup: FormGroup;
	/**
	 * Current Form Control
	 */
	formControl: FormControl;
	/**
	 * Placeholder string for inputs
	 */
	placeholder: 'string';
	/**
	 * Form type
	 */
	type: 'string';
}