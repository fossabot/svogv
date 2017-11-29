import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetFieldProperties } from '../../../shared/models/widget-field-properties.m';
import { WidgetUiOptions } from '../../../shared/models/widget-ui-options.m';
import { Widget } from '../../../shared/models/widget.m';

@Component({
	
	selector: 'ac-editor-checkbox',
	templateUrl: 'checkbox-widget.component.html',
	styleUrls: ['checkbox-widget.component.scss']
})
export class CheckboxWidgetComponent implements OnInit, Widget {
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
	 * Standard required option
	 */
	required: boolean;

	/**
	 * UI options which you can update by using props.ui (UISchema).
	 */
	ui: WidgetUiOptions;

	/**
	 * Title of the widget.
	 */
	title: string;

	/**
	 * Optional description
	 */
	description: string;

	/**
	 * Add widget classes via host binding by using props.ui['ui:classes']
	 */
	@HostBinding('class') widgetClasses = '';

	/**
	 * Initialize component and set default values
	 */
	ngOnInit() {
		this.ui = this.props.ui;
		this.description = this.ui['ui:description'] || '';
		this.title = this.props.title;
		this.formControl = this.props.formControl;
		this.required = this.props.schema.required || false;
		this.widgetClasses = this.ui['ui:classes'] || this.widgetClasses;
	}

	/**
	 * Set standard validator functionality
	 */
	setValidators() {
	}
}