import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../../store/index';
import { UiCommonFormValidated } from '../../../../../store/ui/common/ui.common.actions';
import { BBFormFrameworkComponent } from '../form-framework/bb-form-framework.component';
import { BBCheckboxComponent } from '../form-framework/checkbox/bb-checkbox.component';
import { BBEmailComponent } from '../form-framework/email/bb-email.component';
import { BBFieldsetComponent } from '../form-framework/fieldset/bb-fieldset.component';
import { BBInputNorwayComponent } from '../form-framework/input-norway/bb-input-norway.component';
import { BBInputComponent } from '../form-framework/input/bb-input.component';
// import { BBCheckboxesComponent } from "../form-framework/checkboxes/bb-checkboxes.component";
import { BBRadioComponent } from '../form-framework/radio/bb-radio.component';
import { BBSelectComponent } from '../form-framework/select/bb-select.component';
import { BBSubmitComponent } from '../form-framework/submit/bb-submit.component';
import { BBWizardStepComponent } from '../form-framework/wizard/bb-wizard-step.component';
import { BBWizardComponent } from '../form-framework/wizard/bb-wizard.component';

const customWidgets = {
	'input': BBInputComponent,
	'email': BBEmailComponent,
	'select': BBSelectComponent,
	'checkbox': BBCheckboxComponent,
	// 'checkboxes': BBCheckboxesComponent,
	'radio': BBRadioComponent,
	'input-norway': BBInputNorwayComponent,
	'fieldset': BBFieldsetComponent,
	'wizard': BBWizardComponent,
	'wizard-step': BBWizardStepComponent,
	'submit': BBSubmitComponent
};

// Since this comes from the JSON-schema-form framework the types should be there somewhere
// ToDo: Find out how to get the typings from the library
export interface ValidatorError {
	dataPath: string;
	keyword: string;
	params: any;
	allowedValues?: any;
	schemaPath: string;
	message?: string;
};

@Component({
	selector: 'bb-dynamic-form',
	templateUrl: 'dynamic-form.component.html',
	styleUrls: ['dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
	@Input() schema: any; // The JSON Schema
	@Input() layout: any[]; // The form layout
	@Input() data: any; // The data model
	@Input() options: any; // The global form options

	// React JSON Schema Form API compatibility inputs
	@Input() JSONSchema: any; // Alternate input for JSON Schema
	@Input() UISchema: any; // UI schema - alternate form layout format
	@Input() formData: any; // Alternate input for data model

	// Development inputs, for testing and debugging
	@Input() debug: boolean; // Show debug information?

	// I18N
	@Input() i18n: any; // Take i18n props
	@Input() addSubmit: boolean; // add submit button to form?

	// Outputs
	@Output() onChanges = new EventEmitter<any>(); // Live unvalidated internal form data
	@Output() onSubmit = new EventEmitter<any>(); // Complete validated form data
	@Output() isValid = new EventEmitter<boolean>(); // Is current data valid?
	@Output() validationErrors = new EventEmitter<any>(); // Validation errors (if any)
	@Output() formSchema = new EventEmitter<any>(); // Final schema used to create form
	@Output() formLayout = new EventEmitter<any>(); // Final layout used to create form

	framework = {
		framework: BBFormFrameworkComponent,
		widgets: customWidgets
	};

	@ViewChild('formComponent') formComonent;

	widgets = customWidgets;

	constructor(private store: Store<State>) {
		// this.formData = store.select('data')
		//    .skip(1)
		//    // .map(this.getCompany)
		//    .subscribe(result =>  result);
	}

	getCompany(state: State): object {
		return (<any>state).registration;
	}

	ngOnInit() {
		this.options = this.options || {};

		if (this.i18n) {
			this.options.i18n = this.i18n;
		}

		if (typeof this.addSubmit !== 'undefined') {
			this.options.addSubmit = this.addSubmit;
		}
	}

	validateErrors(errors: ValidatorError[]) {
		this.store.dispatch(new UiCommonFormValidated(errors || []));
	}

	onChangesFn($event) {
		const data = { instance: this.formComonent.jsf, currentData: $event};
		this.onChanges.emit(data);
	}

	onIsValidFn($event) {
		// console.log($event);
	}

	onSubmitFn($event) {
		const data = { instance: this.formComonent.jsf, currentData: $event};
		this.onSubmit.emit(data.instance.formGroup);
	}
}
