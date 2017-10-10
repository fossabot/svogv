import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
	selector: 'ac-link',
	templateUrl: 'link.component.html',
	styleUrls: ['link.component.scss']
})
export class LinkComponent implements OnInit {

	@HostBinding('class.is-disabled') @Input() public disabled: boolean;
	@Input() public iconName: string;
	@Input() public iconSize: string;

	ngOnInit() {}
}
