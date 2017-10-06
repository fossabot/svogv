import { Component, Input } from '@angular/core';

@Component({
	selector: 'bb-root-widget',
	templateUrl: 'bb-root.component.html'
})
export class BBRootComponent {
	@Input() i18nStore: string;
	@Input() formID: number;
	@Input() dataIndex: number[];
	@Input() layoutIndex: number[];
	@Input() layout: any[];

	trackByItem(layoutItem: any) {
		return layoutItem && layoutItem._id;
	}
}