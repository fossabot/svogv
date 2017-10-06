import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'bb-pill',
	template: '<div class="pill--container"><ng-content></ng-content></div>',
	styleUrls: ['pill.component.scss']
})
export class PillComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
