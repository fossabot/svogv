import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetFieldProperties } from '../../../shared/models/widget-field-properties.m';
import { WidgetUiOptions } from '../../../shared/models/widget-ui-options.m';
import { Widget } from '../../../shared/models/widget.m';

@Component({
	moduleId: module.id,
	selector: 'ac-editor-fieldset',
	templateUrl: 'fieldset-widget.component.html',
	styleUrls: ['fieldset-widget.component.scss']
})
export class FieldsetWidgetComponent implements OnInit, Widget {
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
	 * Optional help.
	 */
	help: string;

	/**
	 * UI options which you can update by using props.ui (UISchema).
	 */
	ui: WidgetUiOptions;

	/**
	 * Add widget classes via host binding by using props.ui['ui:classes']
	 */
	@HostBinding('class') widgetClasses = '';

	/**
	 * Initialize component and set default values
	 */
	ngOnInit() {
		this.ui = this.props.ui;
		this.formControl = this.props.parentFormGroup.controls[this.props.path];
		this.legend = (<any>this.ui)['ui:legend'].toString() || this.props.title || undefined;
		this.description = this.ui['ui:description'];
		this.help = (<any>this.ui)['ui:help'].toString();
		this.widgetClasses = this.ui['ui:classes'] || this.widgetClasses;
	}

	setValidators() {}
}
