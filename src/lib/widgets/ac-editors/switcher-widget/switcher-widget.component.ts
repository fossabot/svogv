import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetFieldProperties } from '../../../shared/models/widget-field-properties.m';
import { WidgetUiOptions } from '../../../shared/models/widget-ui-options.m';
import { Widget } from '../../../shared/models/widget.m';

@Component({
	selector: 'switcher-widget',
	templateUrl: 'switcher-widget.component.html',
	styleUrls: ['switcher-widget.component.scss']
})
export class SwitcherWidgetComponent implements OnInit, Widget {
	/**
	 * Passed props which will be added by widget-selector.component.
	 * Important note: You can not use the props in the constructor() function.
	 */
	props: WidgetFieldProperties;

	/**
	 * Abstract Control
	 * The value will be assigned by using props.formControl.
	 */
	formControl: AbstractControl;

	/**
	 * Legend
	 * The legend will be assigned by using props.ui['ui:legend'] or props.title.
	 */
	legend: string;
	/**
	 * Optional description.
	 */
	description: string;

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
	 * Add widget classes via host binding by using props.ui['ui:classes']
	 */
	@HostBinding('class') widgetClasses = '';

	/**
	 * Toggle 'is-checked' class
	 */
	@Input() @HostBinding('class.is-checked') checked = false;

	@Output() change = new EventEmitter<boolean>();


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

	@HostListener('click', ['$event'])
	toggleState() {
		this.checked = !this.checked;
		this.change.emit(this.checked);
	}
}