import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'ac-description-item',
	templateUrl: './description-item.component.html',
	styleUrls: ['./description-item.component.scss']
})
export class DescriptionItemComponent {

	@Input() public subHeadline: string;
	@Input() public supraHeadline: string;
	@Input() public markerType: string;
	@Input() public markerLevel: string;
	@HostBinding('class.is-deactivated') @Input() public inactive;

	get marker()  {
		return {
			type: this.markerType,
			level: this.markerLevel
		};
	}
}
