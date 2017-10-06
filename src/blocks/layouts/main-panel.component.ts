import { Component } from '@angular/core';

@Component({
	selector: 'main-panel',
	template: `
        <ng-content></ng-content>
	`,
	styleUrls: ['main-panel.component.scss']
})
export class MainPanelComponent {
}
