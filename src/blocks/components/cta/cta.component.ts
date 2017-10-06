import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'bb-cta',
	templateUrl: 'cta.component.html',
	styleUrls: ['cta.component.scss']
})
export class BBCtaComponent implements OnInit {

	constructor() {
	}

	@HostListener('click', ['$event'])
	toggleActiveState(event: Event) {
		const target = <HTMLInputElement>event.target;

		target.classList.toggle('is-active');
	}

	ngOnInit() {
	}

}
