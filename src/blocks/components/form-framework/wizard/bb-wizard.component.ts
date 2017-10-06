import {
	AfterContentInit, Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { JsonSchemaFormService } from 'angular2-json-schema-form';
import { Subscription } from 'rxjs/Rx';
import { BBWizardStepComponent } from './bb-wizard-step.component';

import { Store } from '@ngrx/store';
import { UiRegistrationState } from '../../../../../../store/ui/registration/ui.registration.state';

@Component({
	selector: 'wizard-widget',
	templateUrl: 'bb-wizard.component.html'
})
export class BBWizardComponent implements OnInit, OnDestroy, AfterContentInit {
	private options: any;
	private _subscription: Subscription;
	private steps: Array<BBWizardStepComponent> = [];

	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	registrationState: UiRegistrationState;

	constructor(private jsf: JsonSchemaFormService,
				private store: Store<any>) {

		this._subscription = this.store.select(s => s.ui.registration)
			.subscribe(registrationState => {
				this.registrationState = registrationState;
			});
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
	}

	goToStep(index: number) {
	}

	setTitle(item: any = null, index: number = null): string {
		return this.jsf.setTitle(this, item, index);
	}

	ngAfterContentInit() {
		this.layoutNode.items.forEach(step => this.steps.push(step));
	}

	ngOnDestroy() {
		// prevent memory leak when component destroyed
		this._subscription.unsubscribe();
	}

}
