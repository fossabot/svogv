import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { JsonSchemaFormService } from 'angular2-json-schema-form';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Rx';
import { NorwayCompanyLoadAction } from '../../../../../../store/data/registration/form-data/data.form-data.actions';
import { State } from '../../../../../../store/index';

@Component({
	selector: 'bb-input-norway-widget',
	templateUrl: 'bb-input-norway.component.html'
})
export class BBInputNorwayComponent implements OnInit {
	formControl: AbstractControl;
	controlName: string;
	private controlValue: any;
	controlDisabled = false;
	boundControl = false;
	private options: any;
	autoCompleteList: string[] = [];
	@Input() formID: number;
	@Input() layoutNode: any;
	@Input() layoutIndex: number[];
	@Input() dataIndex: number[];

	private loading = false;
	norwayCompany$;

	constructor(private el: ElementRef,
				private jsf: JsonSchemaFormService,
				private store: Store<State>) {

		this.controlValue = Observable
			.fromEvent<KeyboardEvent>(el.nativeElement, 'input')
			.map((event) => {
				console.log(event);
				this.loading = true;
				return (<HTMLInputElement>event.target).value;
			})
			.debounceTime(1000)
			.distinctUntilChanged()
			.subscribe((value: any) => {
					this.store.dispatch(new NorwayCompanyLoadAction(value));
					this.loading = false;
					this.jsf.updateValue(this, value);
				},
				error => this.loading = false,
				() => this.loading = false);

		this.norwayCompany$ = store.select('data')
		// .skip(1)
			.map(this.getCompany)
			.share();
	}

	getCompany(state: State): object {
		return (<any>state).registration.wizard.company;
	}

	ngOnInit() {
		this.options = this.layoutNode.options;
		this.options.fieldHtmlClass = 'form__field form__input-text';
		this.options.labelHtmlClass = 'form__label form__input-label';

		this.jsf.initializeControl(this);
	}

	callNorwayService(event: Event) {
		return this.store.dispatch(new NorwayCompanyLoadAction((<any>event.target).value));
	}
}
