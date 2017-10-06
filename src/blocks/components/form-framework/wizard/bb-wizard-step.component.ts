import { Component, Input, OnInit } from '@angular/core';


@Component({
	selector: 'wizard-step-widget',
	templateUrl: 'bb-wizard-step.component.html',
})
export class BBWizardStepComponent implements OnInit {

	private options: any;
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	constructor() {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
	}

}
