import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
	selector: 'ac-ui-switch',
	template: '<div class="ui-switch__control"></div>',
	styleUrls: ['ui-switch.component.scss']
})

export class UiSwitchComponent {

	@Output() change = new EventEmitter<boolean>();

	@Input()
	@HostBinding('class.is-checked')
	checked: boolean;

	@HostListener('click', ['$event'])
	toggleState() {
		this.checked = !this.checked;
		this.change.emit(this.checked);
	}

}