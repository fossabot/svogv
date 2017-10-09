import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
	selector: '[validate-on-blur]'
})
export class ValidateOnBlurDirective {
	/**
	 * Validator elements
	 */
	private validators: any;

	/**
	 * Async validator elements
	 */
	private asyncValidators: any;

	/**
	 * Current control
	 */
	@Input() control: FormControl;

	/**
	 * At focus delete all validators.
	 */
	@HostListener('focus') onFocus($event: UIEvent) {
		this.validators = this.control.validator;
		this.asyncValidators = this.control.asyncValidator;
		this.control.clearAsyncValidators();
		this.control.clearValidators();
	}

	/**
	 * At blur add all validators back.
	 */
	@HostListener('blur') onBlur($event: UIEvent) {
		this.control.setAsyncValidators(this.asyncValidators);
		this.control.setValidators(this.validators);
		this.control.updateValueAndValidity();
	}
}