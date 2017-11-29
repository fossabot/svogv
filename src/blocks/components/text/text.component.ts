import { Component, Input, OnInit } from '@angular/core';
import { TextViewModel } from './text.vm';

/**
 * A page header construct that consists of h1, h2, and a paragraph.
 */
@Component({
	selector: 'ac-text',
	templateUrl: 'text.component.html',
	styleUrls: ['text.component.scss']
})
export class TextComponent implements OnInit {

	/**
	 * The components data structure. All parameters are optional.
	 */
	@Input() vm: TextViewModel;

	constructor() {
	}

	ngOnInit() {
	}
}
