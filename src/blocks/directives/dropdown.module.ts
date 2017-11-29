import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { DropdownOpenDirective } from './dropdown-open.directive';

export * from './dropdown.directive';
export * from './dropdown-open.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		DropdownDirective,
		DropdownOpenDirective
	],
	exports: [
		DropdownDirective,
		DropdownOpenDirective
	]
})
export class DropdownModule {

}