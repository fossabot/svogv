import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from 'angular2-json-schema-form';

import { Store } from '@ngrx/store';

@Component({
	selector: 'bb-submit-widget',
	templateUrl: 'bb-submit.component.html'
})
export class BBSubmitComponent implements OnInit {
	formControl: AbstractControl;
	controlName: string;
	controlValue: any;
	controlDisabled = false;
	boundControl = false;
	options: any;
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	constructor(private jsf: JsonSchemaFormService,
				private store: Store<any>) {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.jsf.initializeControl(this);
	}

	updateValue(event) {
		this.jsf.updateValue(this, event.target.value);
	}
}
