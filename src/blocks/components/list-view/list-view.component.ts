import { Component, ContentChildren, DoCheck, ElementRef, Input, OnDestroy, QueryList, ViewChild } from '@angular/core';

/**
 * @export
 * @class ListViewComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'list-view',
	templateUrl: 'list-view.component.html',
	styleUrls: ['list-view.component.scss']
})
export class ListViewComponent implements DoCheck, OnDestroy {

	/**
	 * Current active filter
	 * @type {string}
	 * @memberof ListViewComponent
	 */
	@Input('filtered-by') filteredBy: string;

	/**
	 * Current sorting criteria
	 * @type {string}
	 * @memberof ListViewComponent
	 */
	@Input('sorted-by') sortedBy: string;

	/**
	 * Reference to the  list injected via interpolation
	 * @type {ElementRef}
	 * @memberof ListViewComponent
	 */
	@ViewChild('scrollableList') scrollableList: ElementRef;

	/**
	 *
	 * Reference the  list  items
	 * @type {Array<ElementRef>}
	 * @memberof ListViewComponent
	 */
	@ContentChildren('listItem') listItems: QueryList<ElementRef>;


	private showShade: boolean;
	private changeDetectionIndex: number;

	constructor() {
		this.showShade = true;
		this.changeDetectionIndex = 0;
	}

	/**
	 * Adds event listener for internal scrolling
	 * (changeDetectionIndex will avoid  digging in the cycle  more than one time)
	 * @memberof ListViewComponent
	 */
	ngDoCheck() {
		if (typeof this.scrollableList !== 'undefined' && this.changeDetectionIndex === 0) {
			this.scrollableList.nativeElement.addEventListener('scroll', (event) => {
				// There's a buffer of 20px as we want to remove the gradient a little before the user reaches the end
				this.showShade = event.target.scrollHeight - event.target.scrollTop > event.target.clientHeight + 20 ? true : false;
			}, true);
			this.changeDetectionIndex += 1;
		}
	}


	/**
	 * Removes event listener attached to @ViewChild
	 * @memberof ListViewComponent
	 */
	ngOnDestroy(): void {
		if (this.scrollableList) {
			this.scrollableList.nativeElement.removeEventListener('scroll' , () => { } );
		}
	}
}
