import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { JsonSchemaFormService } from 'angular2-json-schema-form';
import { UiCommonFormChanged } from '../../../../../../store/ui/common/ui.common.actions';
import { buildTitleMap } from '../shared/helpers.functions';

@Component({
	selector: 'select-widget',
	templateUrl: 'bb-select.component.html'
})
export class BBSelectComponent implements OnInit {
	formControl: AbstractControl;
	controlName: string;
	controlValue: any;
	controlDisabled: boolean;
	options: any;
	selectList: any[] = [];
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	private dropdownState = false;

	toggleDropdown(value) {
		if (this.dropdownState === true) {
			this.jsf.updateValue(this, value);
		}

		this.dropdownState = !this.dropdownState;

	}

	closeDropdown() {
		this.dropdownState = false;
	}

	onBlur($event) {

		if ($event.relatedTarget !== null
			&& $event.relatedTarget.attributes['ng-reflect-name']
			&& $event.target.attributes['ng-reflect-name'].value === $event.relatedTarget.attributes['ng-reflect-name'].value
		) {
			this.controlValue = $event.target.attributes['ng-reflect-value'].value;
		} else {
			this.closeDropdown();
		}

	}

	constructor(private jsf: JsonSchemaFormService,
				private _eref: ElementRef,
				private store: Store<any>) {
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.options.htmlClass = 'form__select form__select-wrapper';
		this.options.fieldHtmlClass = 'form__input form__select-input';
		this.options.labelHtmlClass = 'form__label form__select-label';

		this.options.dropdownList = 'dropdown';
		this.options.dropdownItem = 'dropdown-item';
		this.options.dropdownItemLabel = 'form__label form__dropdown-label';
		this.options.dropdownItemInput = 'form__input form__dropdown-input';

		this.selectList = buildTitleMap(
			this.options.titleMap || this.options.enumNames,
			this.options.enum,
			!!this.options.required
		);

		this.jsf.initializeControl(this);

		this.formControl.valueChanges.subscribe(changes => {
			const controlChangeEvent = {
				dataPointer: this.layoutNode.dataPointer,
				value: this.formControl.value
			};
			this.store.dispatch(new UiCommonFormChanged(controlChangeEvent));
		});

		/**
		 * Set the right default control value if both default and first enum are empty
		 */
		this.controlValue = this.controlValue === null && this.options.default === '' ? this.controlValue = '' : this.controlValue;

	}

	updateValue(event) {
		this.closeDropdown();
		this.jsf.updateValue(this, event.target.value);
	}

}

