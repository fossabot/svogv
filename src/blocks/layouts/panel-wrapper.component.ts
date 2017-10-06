import { Component } from '@angular/core';

@Component({
	selector: 'panel-wrapper',
	template: `
        <ng-content></ng-content>
	`,
	styleUrls: ['panel-wrapper.component.scss']
})
export class PanelWrapperComponent {
}
