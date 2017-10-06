import { Directive, ElementRef, Host, HostListener, OnDestroy } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
	/* tslint:disable-next-line */
	selector: '[bb-dropdown-open]'
})
export class DropdownOpenDirective implements OnDestroy {

	// -------------------------------------------------------------------------
	// Private Properties
	// -------------------------------------------------------------------------

	/**
	 * This hack is needed for dropdown not to open and instantly closed
	 */
	private openedByFocus = false;

	private closeDropdownOnOutsideClick: (event: Event) => void;

	// -------------------------------------------------------------------------
	// Constructor
	// -------------------------------------------------------------------------

	constructor(@Host() public dropdown: DropdownDirective,
				private elementRef: ElementRef) {
		this.closeDropdownOnOutsideClick = evt => this.closeIfInClosableZone(evt);
	}

	// -------------------------------------------------------------------------
	// Public Methods
	// -------------------------------------------------------------------------

	toggle() {
		if (this.dropdown.isOpened()) {
			this.close();
		} else {
			this.open();
		}
	}

	open() {
		if (this.dropdown.isOpened()) {
			return;
		}

		this.dropdown.open();

		/*
		document.addEventListener('click', (event) => {
			this.closeIfInClosableZone(event);
		});
		*/
		document.addEventListener('click', this.closeDropdownOnOutsideClick, true);
	}

	close() {
		if (!this.dropdown.isOpened()) {
			return;
		}

		this.dropdown.close();
		document.removeEventListener('click', this.closeDropdownOnOutsideClick, true);
	}

	@HostListener('click')
	openDropdown() {
		if (this.dropdown.activateOnFocus && this.openedByFocus) {
			this.openedByFocus = false;
			return;
		}

		if (this.dropdown.isOpened() && this.dropdown.toggleClick) {
			this.close();
		} else {
			this.open();
		}
	}

	@HostListener('keydown', ['$event'])
	dropdownKeydown(event: KeyboardEvent) {
		if (event.keyCode === 40) { // down
			this.openDropdown();
		}
	}

	@HostListener('focus')
	onFocus() {
		if (!this.dropdown.activateOnFocus) {
			return;
		}
		this.openedByFocus = true;
		this.dropdown.open();
		document.addEventListener('click', this.closeDropdownOnOutsideClick, true);
	}

	@HostListener('blur', ['$event'])
	onBlur(event: FocusEvent) {
		if (!this.dropdown.activateOnFocus) {
			return;
		}
		if (event.relatedTarget && event.relatedTarget !== this.elementRef.nativeElement) {

			this.dropdown.close();
			document.removeEventListener('click', this.closeDropdownOnOutsideClick, true);
		}
	}

	// -------------------------------------------------------------------------
	// Lifecycle Methods
	// -------------------------------------------------------------------------
	ngOnDestroy() {
		document.removeEventListener('click', this.closeDropdownOnOutsideClick, true);
	}

	// -------------------------------------------------------------------------
	// Private Methods
	// -------------------------------------------------------------------------
	private closeIfInClosableZone(event: Event) {
		if (event.target !== this.elementRef.nativeElement
			&& !this.elementRef.nativeElement.contains(event.target)) {
			this.dropdown.close();
			document.removeEventListener('click', this.closeDropdownOnOutsideClick, true);
		}
	}
}
