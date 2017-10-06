import { Component } from '@angular/core';

@Component({
	selector: 'side-panel',
	template: `
        <ng-content></ng-content>
	`,
	styleUrls: ['side-panel.component.scss']

})
export class SidePanelComponent {
}
