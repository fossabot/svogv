import { Component, Input, OnInit } from '@angular/core';
import { JsonSchemaFormService } from 'angular2-json-schema-form';

@Component({
	selector: 'bb-fieldset-widget',
	templateUrl: 'bb-fieldset.component.html'
})
export class BBFieldsetComponent implements OnInit {
	private options: any;
	private expanded = true;
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];
	@Input() i18nStore: string;

	constructor(private jsf: JsonSchemaFormService) {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.expanded = !this.options.expandable;
	}

	expand() {
		if (this.options.expandable) {
			this.expanded = !this.expanded;
		}
	}
}
