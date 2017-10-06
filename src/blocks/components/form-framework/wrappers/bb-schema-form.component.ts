import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { JsonSchemaFormComponent, JsonSchemaFormService } from 'angular2-json-schema-form';

@Component({
	selector: 'bb-schema-form',
	templateUrl: 'bb-schema-form.component.html',
	providers: [JsonSchemaFormService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BBSchemaFormComponent extends JsonSchemaFormComponent implements OnChanges {
	@Input()
	i18nStore: string;

	myformID = '123';

}
