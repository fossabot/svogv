import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from 'angular2-json-schema-form';

@Component({
	selector: 'bb-input-widget',
	templateUrl: 'bb-input.component.html'
})
export class BBInputComponent implements OnInit, OnChanges {
	formControl: AbstractControl;
	private controlName: string;
	controlValue: any;
	controlDisabled = false;
	boundControl = false;
	private options: any;
	private store: string;
	autoCompleteList: string[] = [];
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	constructor(private jsf: JsonSchemaFormService) {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.options.fieldHtmlClass = 'form__input form__input-text form__field';
		this.options.labelHtmlClass = 'form__label form__input-label';

		this.store = this.options.i18n;

		this.controlName = this.layoutNode.name;

		this.jsf.initializeControl(this);
	}

	updateValue(event) {
		this.jsf.updateValue(this, event.target.value);
	}

	ngOnChanges(changes) {
		console.log('changes in onchanges in bb-input:');
		console.log(changes);
	}
}
