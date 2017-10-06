import { Component, Input } from '@angular/core';

@Component({
	selector: 'bb-fly-out-item',
	templateUrl: './fly-out-item.component.html',
	styleUrls: ['./fly-out-item.component.scss']
})
export class BBFlyOutItemComponent {
	@Input() public iconName: string;
	@Input() public iconSize: string;
}
