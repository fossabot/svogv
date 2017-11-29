import { Component, Input } from '@angular/core';

@Component({
	selector: 'ac-icon',
	templateUrl: 'icon.component.html',
	styleUrls: ['icon.component.scss'],
})

/**
 * Creates the IconComponent.
 * @class
 */
export class IconComponent {

	/**
	 * Icon name
	 */
	@Input() iconName: string;
	@Input() size: string;
	@Input() color: string;


}

