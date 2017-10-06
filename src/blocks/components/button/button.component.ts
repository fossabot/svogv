import { Component, HostBinding, Input } from '@angular/core';

/**
 * The button dumb component
 */
@Component({
	selector: 'ac-button',
	template: '<ng-content></ng-content>',
	styleUrls: ['button.component.scss']
})
export class ButtonComponent {

	/**
	 * Bind to the is-disabled class
	 * @type {boolean}
	 */
	@HostBinding('class.is-disabled') @Input() public disabled = false;
}
