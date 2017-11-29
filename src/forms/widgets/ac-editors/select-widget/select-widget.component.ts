import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetErrorMessages } from '../../../shared/models/widget-error-messages.m';
import { WidgetFieldProperties } from '../../../shared/models/widget-field-properties.m';
import { Widget } from '../../../shared/models/widget.m';
import { FormPubSubService } from '../../../services/formpubsub.service';

import 'rxjs/add/operator/filter';

/**
 * Select Widget
 *
 * For now it is a simplified component which needs the following:
 * TODO: Split component into multiple ones and use @Input/@Output. Here are too many DOM selections ...
 */
@Component({
	
	selector: 'ac-editor-select',
	templateUrl: 'select-widget.component.html',
	styleUrls: ['select-widget.component.scss']
})
export class SelectWidgetComponent implements OnInit, Widget {
	/**
	 * Passed props which will be added by widget-selector.component.
	 * Important note: You can not use the props in the constructor() function.
	 */
	props: WidgetFieldProperties;

	/**
	 * Abstract Control
	 * The value will be assigned by using props.formControl
	 */
	formControl: AbstractControl;

	/**
	 * Standard error message object which can be easily used to set custom error message.
	 */
	errorMessages: WidgetErrorMessages;

	/**
	 * Error message which will be displayed.
	 */
	errorMessage: string;

	/**
	 * Show inline error message by using UISchema.
	 */
	showErrorMessage: boolean;

	/**
	 * Add multi select functionality
	 */
	isMultiSelect: boolean;

	/**
	 * Set open/close state
	 */
	isOpen: boolean;

	/**
	 * Default placeholder text
	 */
	placeholder = 'form_elements.placeholders.i18n_select';

	/**
	 * Set last scroll offset
	 */
	lastScrollOffset = 0;

	/**
	 * Typical class options
	 */
	options = {
		activeClass: 'is-active',
		disabledClass: 'is-disabled',
		openClass: 'is-open',
		useSelectWidth: true
	};

	/**
	 * Add widget classes via host binding by using props.ui['ui:classes']
	 */
	@HostBinding('class') widgetClasses = '';

	/**
	 * Reference to replacer button
	 */
	@ViewChild('replacer') replacer: ElementRef;

	/**
	 * Reference to generic list wrapper element
	 */
	@ViewChild('listWrapper') listWrapper: ElementRef;

	/**
	 * Reference to list element
	 */
	@ViewChild('listWrapperInner') listWrapperInner: ElementRef;

	/**
	 * Reference to every option item
	 */
	@ViewChild('optionListItem') optionListItem: ElementRef;

	/**
	 * Reference to button wrapper
	 */
	@ViewChild('btnWrapper') btnWrapper: ElementRef;

	/**
	 * Reference to button
	 */
	@ViewChild('btn') btn: ElementRef;

	/**
	 * Constructor which injects ElementRef
	 */
	constructor(private el: ElementRef, private pubSubSrv: FormPubSubService) {
	}

	/**
	 * Initialize component,
	 * set placeholder, isOpen to false, widgetClasses,
	 * close list and subscribe to changes.
	 */
	ngOnInit() {
		this.isMultiSelect = this.props.ui.options && this.props.ui.options.multiple ? this.props.ui.options.multiple : false;
		this.placeholder = this.getPlaceholder();
		this.isOpen = false;
		this.widgetClasses = this.props.ui['ui:classes'] || this.widgetClasses;
		this.showErrorMessage = this.props.ui['ui:inline-errors'] || false;
		this.errorMessages = {
			required: `The field ${this.props.title} is required. Please choose an option!`
		};

		this.closeList();
		this.subscribes();
	}

	/**
	 * Get placeholder by using default value, uiSchema or default definition
	 *
	 * @return string
	 */
	private getPlaceholder(): string {
		const val = this.props.formControl.value;

		if (val) {
			return this.props.schema.enumNames[this.getIndexByVal(val, this.props.schema.enum)];
		} else if (this.props.ui['ui:placeholder']) {
			return this.props.ui['ui:placeholder'];
		} else {
			return this.placeholder;
		}
	}

	/**
	 * Get current index of value in array
	 *
	 * @return number|null
	 */
	private getIndexByVal(value: string, arr: Array<string>): number | null {
		let index: number | null = null;

		arr.forEach((item, idx) => {
			if (item === value) {
				index = idx;
			}
		});

		return index;
	}

	/**
	 * Subsribe to changes
	 */
	private subscribes(): void {
		this.props.formControl.valueChanges
			.subscribe(value => {

				this.setErrorMessage(this.props.formControl);

				// Select placeholder when value is changed by patchValue from an external
				const options = Array.prototype.slice.call((this.el.nativeElement).querySelectorAll('option'));
				let selectedOption;

				for (let i = 0; i < options.length; i++) {
					if (options[i].value === value) {
						selectedOption = options[i];
					}
				}

				if (selectedOption.getAttribute('selected')) {
					return;
				} else {
					this.placeholder = this.getPlaceholder();
				}
			});

		this.pubSubSrv
			.get()
			.filter(data => data.channel === 'select:close:all')
			.subscribe(() => {
				this.closeList();
			});
	}

	/**
	 * Set current error message
	 *
	 * @param control [AbstractControl] - props.formControl to check angainst errors.
	 */
	setErrorMessage(control: AbstractControl): void {
		this.errorMessage = '';

		if (control.errors) {
			this.errorMessage = Object
				.keys(control.errors)
				.map((errorMsg) => {
					return this.errorMessages[errorMsg];
				})
				.join(' ');
		}
	}

	/**
	 * Handle click outside button or list
	 */
	defaultClickHandler(): void {
		this.closeList();
	}

	/**
	 * Handle click on button
	 *
	 * @param {Object} e - Event object
	 */
	buttonHandler(e: UIEvent) {
		e.stopPropagation();

		this.isOpen ? this.closeList() : this.openList();
	}

	/**
	 * Handle click on list item
	 *
	 * @param {Object} e - Event object
	 */
	selectItemHandler(e: UIEvent) {
		const targetEl = e.target as HTMLSelectElement;
		const options = Array.prototype.slice.call((this.el.nativeElement).querySelectorAll('option'));
		this.placeholder = this.props.schema.enumNames[targetEl.getAttribute('data-index')];
		this.lastScrollOffset = this.listWrapperInner.nativeElement.offsetTop;
		let selectedOption;

		for (let i = 0; i < options.length; i++) {
			if (options[i].value === targetEl.value) {
				selectedOption = options[i];
			}
		}

		e.stopPropagation();

		if (targetEl.classList.contains(this.options.disabledClass)) {
			return;
		}

		this.props.formControl.patchValue(targetEl.value);

		if (selectedOption.getAttribute('selected')) {
			selectedOption.setAttribute('selected', '');
		} else {
			selectedOption.setAttribute('selected', true);
		}

		if (!this.isMultiSelect) {
			this.closeList();
		}

	}

	/**
	 * Open list
	 */
	openList() {
		this.pubSubSrv.trigger('select:close:all');

		this.btn.nativeElement.setAttribute('aria-expanded', true);
		this.btnWrapper.nativeElement.classList.add(this.options.openClass);
		this.listWrapper.nativeElement.classList.add(this.options.openClass);
		this.listWrapper.nativeElement.removeAttribute('disabled');

		this.isOpen = true;
	}


	/**
	 * Close list
	 */
	closeList() {
		this.btn.nativeElement.setAttribute('aria-expanded', false);
		this.btnWrapper.nativeElement.classList.remove(this.options.openClass);
		this.listWrapper.nativeElement.classList.remove(this.options.openClass);
		this.listWrapper.nativeElement.setAttribute('disabled', 'disabled');

		this.isOpen = false;
	}
}
