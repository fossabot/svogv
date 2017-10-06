import { Component, Input } from '@angular/core';

@Component({
	selector: 'bb-icon',
	templateUrl: 'icon.component.html',
	styleUrls: ['icon.component.scss'],
})

/**
 * Creates the BBIconComponent.
 * @class
 */
export class BBIconComponent {

	/**
	 * Icon name
	 */
	@Input() iconName: string;
	@Input() size: string;
	@Input() color: string;


}

