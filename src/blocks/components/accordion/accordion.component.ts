import { Component } from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

/**
 * The accordion component
 */
@Component({
	selector: 'accordion',
	styleUrls: ['accordion.component.scss'],
	template: `<ng-content></ng-content>`
})
export class AccordionComponent {

	/**
	 * The list of items
	 * @type {Array}
	 */
	items: Array<AccordionItemComponent> = [];

	/**
	 * Add a new item function
	 * @param item
	 */
	addItem(item: AccordionItemComponent): void {
		this.items.push(item);
	}

	/**
	 * Close all the other items function
	 * @param openItem
	 */
	closeOthers(openItem: AccordionItemComponent): void {
		this.items.forEach((item: AccordionItemComponent) => {
			if (item !== openItem) {
				item.isOpen = false;
			}
		});
	}

	/**
	 * Get rid of an item
	 * @param item
	 */
	removeItem(item: AccordionItemComponent): void {
		const index = this.items.indexOf(item);
		if (index !== -1) {
			this.items.splice(index, 1);
		}
	}
}
