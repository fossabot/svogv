import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Allow users to order items inside a list-view
 * @export
 * @class OrderWidgetComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'ac-order-widget',
	templateUrl: 'order-widget.component.html',
	styleUrls: ['order-widget.component.scss']
})

/**
 * OrderWidgetComponent class
 */
export class OrderWidgetComponent {

	/**
	 * Receive the order direction
	 */
	@Input() currentOrder: string;

	/**
	 * Emit the new order direction
	 * @type {EventEmitter<string>}
	 */
	@Output() change: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
		this.currentOrder = 'DESC';
	}

	/**
	 * Receive direction string (ASC/DESC) from template, emit the value back
	 * @param direction
	 */
	setDirection(direction: string): void {
		this.currentOrder = direction;
		this.change.emit(direction);
	}
}
