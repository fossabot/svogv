import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from 'angular2-json-schema-form';

@Component({
	selector: 'bb-radio-widget',
	templateUrl: 'bb-radio.component.html'
})
export class BBRadioComponent implements OnInit {
	formControl: AbstractControl;
	controlName: string;
	controlValue: any;
	controlDisabled = false;
	boundControl = false;
	private options: any;
	private trueValue: any = true;
	private falseValue: any = false;
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	constructor(private jsf: JsonSchemaFormService) {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.options.fieldHtmlClass = 'form__input form__radio-input';
		this.options.labelHtmlClass = 'form__label form__radio-label';

		this.jsf.initializeControl(this);
	}

	updateValue(event) {
		this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
	}
}
