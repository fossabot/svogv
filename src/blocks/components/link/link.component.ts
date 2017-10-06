import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
	selector: 'bb-link',
	templateUrl: 'link.component.html',
	styleUrls: ['link.component.scss']
})
export class LinkComponent implements OnInit {

	@HostBinding('class.is-disabled') @Input() public disabled;
	@Input() public iconName;
	@Input() public iconSize;

	ngOnInit() {}
}
