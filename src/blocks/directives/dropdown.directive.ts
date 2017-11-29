import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
	/* tslint:disable-next-line */
	selector: '[ac-dropdown]'
})
export class DropdownDirective {

	// -------------------------------------------------------------------------
	// Inputs / Outputs
	// -------------------------------------------------------------------------

	@Input('dropdownToggle')
	toggleClick = true;

	@Input('dropdownFocusActivate')
	activateOnFocus = false;

	@Output()
	onOpen = new EventEmitter();

	@Output()
	onClose = new EventEmitter();

	// -------------------------------------------------------------------------
	// Constructor
	// -------------------------------------------------------------------------
	constructor(private elementRef: ElementRef) {
	}

	// -------------------------------------------------------------------------
	// Public Methods
	// -------------------------------------------------------------------------

	open() {
		const element: HTMLElement = this.elementRef.nativeElement.parentElement;
		element.classList.add('is-dropdown-open');
		this.onOpen.emit(undefined);
	}

	close() {
		const element: HTMLElement = this.elementRef.nativeElement.parentElement;
		element.classList.remove('is-dropdown-open');
		this.onClose.emit(undefined);
	}

	isOpened() {
		const element: HTMLElement = this.elementRef.nativeElement.parentElement;
		return element.classList.contains('is-dropdown-open');
	}
}