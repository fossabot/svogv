import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from 'angular2-json-schema-form';

@Component({
	selector: 'bb-email',
	templateUrl: 'bb-email.component.html'
})
export class BBEmailComponent implements OnInit {
	formControl: AbstractControl;
	controlName: string;
	controlValue: any;
	controlDisabled = false;
	options: any;
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	constructor(private jsf: JsonSchemaFormService) {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.options.fieldHtmlClass = 'form__field form__input-text form__email-input';
		this.options.labelHtmlClass = 'form__label form__input-label form__email-label';

		this.jsf.initializeControl(this);
		this.validateData(this);
	}

	updateValue(event) {
		this.jsf.updateValue(this, event.target.value);
		this.validateData(this);
	}

	private validateData(newValue) {
		// https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // tslint:disable-line
		!re.test(newValue.controlValue) ? console.log('EMAIL NOT VALID') : console.log('EMAIL VALID');
	}

}