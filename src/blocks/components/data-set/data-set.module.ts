import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataSetItemComponent } from './data-set-item/data-set-item.component';
import { DataSetComponent } from './data-set.component';

/*
 * use the dataset component to show a set of data represented in a certain way
 * using consistent responsive styles
 *
 * use it like this:
 *
 * @example
 *
 * <data-set>
 *   <data-set-item *ngFor="let data of [
 *     {label: 'Label1', value: 'Value1'},
 *     {label: 'My very long Label2', value: 'My very long value 2'},
 *     {label: 'Yet another Label3', value: 'YA value 3'},
 *     {label: 'Lorem ipsum Label4', value: 'Lorem Ipsum value 4'},
 *     {label: 'My very very very long Label5', value: 'My very long value 55'}
 * 	 ]">
 *      <div item-label>{{ data.label }}</div>
 *      <div item-value>{{ data.value }}</div>
 *   </data-set-item>
 * </data-set>
 *
 */

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		DataSetComponent,
		DataSetItemComponent
	],
	exports: [
		DataSetComponent,
		DataSetItemComponent
	]
})
export class DataSetModule {

}
