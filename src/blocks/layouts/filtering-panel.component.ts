import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/index';
import { UiCommonToggleActiveFiltering } from '../../../../store/ui/common/ui.common.actions';

@Component({
	selector: 'filtering-panel',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['filtering-panel.component.scss']

})
export class FilteringPanelComponent implements OnInit, OnDestroy {

	@HostBinding('class.is-open') openState = false;


	constructor(private store: Store<State>, private renderer: Renderer2) {
		this.store.select(s => s.ui.common).subscribe(data => {
			this.openState = data.isFilteringOpen;

			if (this.openState) {
				this.renderer.addClass(document.body, 'isnt-scroll');
			} else if (!this.openState) {
				this.renderer.removeClass(document.body, 'isnt-scroll');
			}
		});
	}

	ngOnInit(): void {
		this.store.dispatch(new UiCommonToggleActiveFiltering());
	}

	ngOnDestroy(): void {
		this.store.dispatch(new UiCommonToggleActiveFiltering());
	}

}
