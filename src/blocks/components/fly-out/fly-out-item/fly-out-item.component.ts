import { Component, Input } from '@angular/core';

@Component({
	selector: 'ac-fly-out-item',
	templateUrl: './fly-out-item.component.html',
	styleUrls: ['./fly-out-item.component.scss']
})
export class FlyOutItemComponent {
	@Input() public iconName: string;
	@Input() public iconSize: string;
}
