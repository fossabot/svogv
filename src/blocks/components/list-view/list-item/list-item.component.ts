import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 *
 * @export
 * @class ListItemComponent
 */
@Component({
	selector: 'ac-list-item',
	templateUrl: 'list-item.component.html',
	styleUrls: ['list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Generic list item component
 */
export class ListItemComponent {

	/**
	 * @type {boolean}
	 * @memberof ListItemComponent
	 */
	@Input('is-active') isActive: boolean;

	/**
	 * @type {string}
	 * @memberof ListItemComponent
	 */
	@Input('item-title') itemTitle: string;

	/**
	 * @type {boolean}
	 * @memberof ListItemComponent
	 */
	@Input('show-horizontal-bars') showHorizontalBars: boolean;

	/**
	 *
	 * @type {number}
	 * @memberof ListItemComponent
	 */
	@Input('bar-percentage-amount') barPercentageAmount: number;

	/**
	 * @type {number}
	 * @memberof ListItemComponent
	 */
	@Input('max-value-reference') maxValueReference: number;

	/**
	 * @type {number}
	 * @memberof ListItemComponent
	 */
	@Input('filter-type') filterType: string;

	/**
	 * @type {Array<{}>}
	 * @memberof ListItemComponent
	 */
	@Input('right-markers') rightMarkers: Array<{}>;



	constructor() {
	}
}
