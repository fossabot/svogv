import { Component, Input } from '@angular/core';
import { ɵw } from 'angular2-json-schema-form';

@Component({
	selector: 'bb-select-widget-widget',
	template: `
        <div #widgetContainer></div>`,
})
export class BBSelectWidgetComponent extends ɵw {
	@Input() i18nStore: string;
}