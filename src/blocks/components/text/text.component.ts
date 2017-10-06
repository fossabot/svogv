import { Component, Input, OnInit } from '@angular/core';
import { TextVM } from './text.vm';

@Component({
	selector: 'bb-text',
	templateUrl: 'text.component.html',
	styleUrls: ['text.component.scss']
})
export class BBTextComponent implements OnInit {

	@Input() vm: TextVM;
	@Input() params: Object;

	constructor() {
	}

	ngOnInit() {
	}
}
