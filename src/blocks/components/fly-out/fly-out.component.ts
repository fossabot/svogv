import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'ac-fly-out',
	templateUrl: './fly-out.component.html',
	styleUrls: ['./fly-out.component.scss']
})
export class FlyOutComponent {

	private openIcon = 'settings';
	private closeIcon = 'close';
	public toggleIcon = this.openIcon;

	@Input() public menuTitle: string;

	@HostBinding('class.is-open') public isOpen = false;

	toggleOpenState() {
		this.isOpen = !this.isOpen;
		this.toggleIcon = this.isOpen ? this.closeIcon : this.openIcon;
	}
}
