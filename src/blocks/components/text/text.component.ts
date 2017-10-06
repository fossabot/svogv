import { Component, Input, OnInit } from '@angular/core';
import { TextVM } from './text.vm';

@Component({
	selector: 'ac-text',
	templateUrl: 'text.component.html',
	styleUrls: ['text.component.scss']
})
export class TextComponent implements OnInit {

	@Input() vm: TextVM;
	@Input() params: Object;

	constructor() {
	}

	ngOnInit() {
	}
}
