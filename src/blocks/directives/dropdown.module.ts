import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BBDropdownDirective } from './dropdown.directive';
import { BBDropdownOpenDirective } from './dropdownOpen.directive';

export * from './dropdown.directive';
export * from './dropdownOpen.directive';

@NgModule({
	imports     : [
		CommonModule
	],
	declarations: [
		BBDropdownDirective,
		BBDropdownOpenDirective
	],
	exports     : [
		BBDropdownDirective,
		BBDropdownOpenDirective
	]
})
export class DropdownModule {

}