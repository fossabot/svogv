import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'bb-tabs',
	template: '<ng-content [class.is-open]="openClass" (click)="openClass = !openClass"></ng-content>',
	styleUrls: ['tabs.component.scss']
})
export class TabsComponent implements OnInit {


	@HostBinding('class.is-open') openState = false;

	@HostListener('click', ['$event'])
	toggleOpenState() {
		this.openState = !this.openState;
	}

	constructor() {
	}

	ngOnInit() {
	}
}
