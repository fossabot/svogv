import { Component, Input } from '@angular/core';
import { ɵv } from 'angular2-json-schema-form';

@Component({
	selector: 'bb-select-framework-widget',
	template: `
        <div #widgetContainer></div>`,
})
export class BBSelectFrameworkComponent extends ɵv {
	@Input() i18nStore: string;
}