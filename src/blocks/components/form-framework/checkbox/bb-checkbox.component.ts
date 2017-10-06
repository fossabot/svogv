import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from 'angular2-json-schema-form';
import * as _ from 'lodash';

@Component({
	selector: 'bb-checkbox-widget',
	templateUrl: 'bb-checkbox.component.html'
})
export class BBCheckboxComponent implements OnInit {
	formControl: AbstractControl;
	controlName: string;
	controlValue: any;
	controlDisabled = false;
	boundControl = false;
	private options: any;
	private trueValue: any = true;
	private falseValue: any = false;
	private chainedControls = {};
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	constructor(private jsf: JsonSchemaFormService) {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.options.fieldHtmlClass = 'form__checkbox-input';
		this.options.labelHtmlClass = 'form__label form__checkbox-label';

		this.jsf.initializeControl(this);

		if (this.options['chainedControls']) {
			for (const controlId of this.options['chainedControls']) {

				this.chainedControls[controlId] = this.formControl.parent.controls[controlId].value;
				this.formControl.parent.controls[controlId].valueChanges.subscribe((val) => {
					this.chainedControls[controlId] = val;
					this.updateValueFromChainedControl();
				});

			}
		}

	}

	updateValue(event) {
		this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
	}

	updateValueFromChainedControl() {
		if (_.includes(_.values(this.chainedControls), true)) {
			this.jsf.updateValue(this, true);
		} else {
			this.jsf.updateValue(this, false);
		}

	}
}
