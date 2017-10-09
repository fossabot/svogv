import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Format log messsages
 *
 * @param {String} message - Message you want to display.
 * @param {String} path - Level in JSON Schema.
 *
 * @return string
 */
function formatMessage(message: string, path: string): string {
	return `Parsing error on ${path}.\n ${message}`;
}

// Warnings
// function schemaError(message, path): void {
// 	const msg = formatMessage(message, path);
// 	throw new Error(msg);
// }


/**
 * Print schema warning message
 *
 * @param {String} message - Message you want to display.
 * @param {String} path - Level in JSON Schema.
 */
function schemaWarning(message: string, path: string): void {
	const msg = formatMessage(message, path);

	if (console && console.warn) {
		console.warn(msg);
	}
}


// Helpers

/**
 * Check if object is available.
 *
 * @param {Object} obj = Object you want to check.
 *
 * @return boolean
 */
function isPresent(obj: any): boolean {
	return obj !== null && obj !== undefined;
}


/**
 * Check if object is not available.
 *
 * @param {Object} obj = Object you want to check.
 *
 * @return boolean
 */
function isntPresent(obj: any): boolean {
	return obj === null || obj === undefined;
}

/**
 * Splits paths by using `/`
 * and returns an array.
 *
 * @return array;
 */
function splitPath(path: string): Array<string> {
	const arr = path.split('/');

	arr.forEach((item, idx) => {
		if (!item.length) {
			arr.splice(idx);
		}
	});

	return arr;
}

/**
 * Return path id
 *
 * @param {String} path - JSON Schema path.
 *
 * @return string
 */
function pathId(path: string): string {
	if (path.length) {
		const arr = splitPath(path);

		return arr[arr.length - 1];
	}
}

/**
 * 1. Loop through schema - CHECK!
 * 2. Create for every object a FormGroup - CHECK!
 * 3. Attach FormControl to FormGroup - CHECK!
 * 4. If FormGroup is nested into another FormGroup add new FormGroup - CHECK!
 * 5. Add FormControls to FormGroup - CHECK!
 * 6. Add UiSchema as persistent state - CHECK!
 * 6. Add validation to FormControls - CHECK!
 */

@Injectable()
export class JsonFormValidatorService {

	schema: any = null;
	ui: any = {};
	form: FormGroup = new FormGroup({});

	/**
	 * Check properties of level
	 *
	 * @param {Object} schema - JSON Schema object.
	 * @param {String} path - JSON Schema path.
	 */
	private static checkProperties(schema: any, path: string) {
		if (isntPresent(schema.properties)) {
			schema.properties = {};
			schemaWarning('Provided JSON schema does not contain a \'properties\' entry. Output will be empty', path);
		}
	}

	/**
	 * Get parent group context
	 *
	 * Recursive function to get nested groups
	 * and return the right context.
	 *
	 * @param {String} path - Current JSON Schema path.
	 * @param {FormGroup} level - Current form control.
	 *
	 * @return FormGroup
	 */
	private static getParentGroup(path: string, level: any): FormGroup {
		const arr = splitPath(path);

		arr.forEach(item => {
			if (isPresent(level.controls[item])) {
				path = item;
				level = level.controls[item];

				JsonFormValidatorService.getParentGroup(path, level);
			}
		});

		return level;
	}

	/**
	 * Function which can be executed to convert JSON Schema into reactive form controls
	 *
	 * @param {Object} schema - Current JSON Schema.
	 * @param {Object} uiSchema - Current UI Schema.
	 *
	 * @return FormGroup
	 */
	public generateForm(schema: any, uiSchema: any = null) {
		this.schema = {};
		this.form = new FormGroup({});
		this.ui = {};

		if (isPresent(schema)) {
			this.schema = Object.assign({}, schema);
		}

		if (isPresent(uiSchema)) {
			this.ui = Object.assign({}, uiSchema);
		}

		return this.processSchema(schema, uiSchema);
	}

	/**
	 * Go through JSON Schema and
	 * build a reactive form out of it
	 * by using FormControl and FormGroup.
	 *
	 * @return FormGroup
	 */
	private processSchema(schema: any, uiSchema: any = null, path = '', formLevel?: FormGroup): FormGroup {
		schema = schema || {};
		formLevel = formLevel || this.form;

		if (schema.type === 'object') {
			JsonFormValidatorService.checkProperties(schema, path);

			if (path) {
				const level = JsonFormValidatorService.getParentGroup(path, formLevel);
				const newGroup = level.controls && level.controls[pathId(path)];

				if (!newGroup) {
					level.addControl(pathId(path), new FormGroup({}));
				}
			}
		} else {
			const level = JsonFormValidatorService.getParentGroup(path, formLevel);
			const isRequired = schema.required ? Validators.required : null;
			const isMin = schema.minLength ? Validators.minLength(schema.minLength) : null;
			const isMax = schema.maxLength ? Validators.maxLength(schema.maxLength) : null;
			const defaultVal = schema.default || '';
			const validators = [];

			if (isRequired) {
				validators.push(isRequired);
			}

			if (isMin) {
				validators.push(isMin);
			}

			if (isMax) {
				validators.push(isMax);
			}

			level.addControl(pathId(path), new FormControl(defaultVal, validators));
		}

		this.loopThrough(schema, path, formLevel);

		return formLevel;
	}

	/**
	 * Loop through fields in schema.properties and
	 * recursively check the schema by executing processSchema().
	 *
	 * @param {Object} schema - Schema you want to loop through
	 * @param {String} path - Path of level
	 * @param {FormGroup} formLevel - Current form group
	 */
	private loopThrough(schema: any, path: string, formLevel: FormGroup): void {
		if (schema.type === 'object') {
			for (const fieldId in schema.properties) {
				if (schema.properties.hasOwnProperty(fieldId)) {
					const fieldSchema = schema.properties[fieldId];
					this.processSchema(fieldSchema, null, path + fieldId + '/', formLevel);
				}
			}
		} else if (schema.type === 'array') {
			this.processSchema(schema.items, path + '*/');
		}
	}

	/**
	 * Get type of field
	 *
	 * @return string
	 */
	getType(field: any): string {
		return field.type;
	}

	/* tslint:disable */
	/**
	 * TODO: Refactor getContext* functions
	 *
	 * Really ugly :(
	 */
	public getContextInSchema(path: string): any {
		let schemaFields: FormGroup;
		const schemaProps = this.schema['properties'];
		const recursiveCheck = function (schema: any, fields: Array<string>, path: string, parent?: FormGroup) {
			for (let i = 0; i < fields.length; i++) {
				if (fields[i] === path) {

					schemaFields = parent;
					break;
				}
			}

			if (schemaFields !== undefined) {
				return;
			}

			if (schema.type === 'object') {
				fields = Object.keys(schema.properties);

				for (const fieldId in schema.properties) {
					if (schema.properties.hasOwnProperty(fieldId)) {
						const fieldSchema = schema.properties[fieldId];
						recursiveCheck(fieldSchema, fields, path, schema);
					}
				}
			}

		};

		recursiveCheck(this.schema, Object.keys(schemaProps), path);

		return schemaFields || this.schema;
	}

	public getContextInForm(path: string): any {
		let formControls: FormGroup;
		const formProps = this.form['controls'];
		const recursiveCheck = function (schema: any, fields: Array<string>, path: string, parent?: FormGroup) {

			for (let i = 0; i < fields.length; i++) {
				if (fields[i] === path) {

					formControls = parent;
					break;
				}
			}

			if (formControls !== undefined) {
				return;
			}

			if (schema.value != null && typeof schema.value === 'object') {
				fields = Object.keys(schema.controls);

				for (const fieldId in schema.controls) {
					if (schema.controls.hasOwnProperty(fieldId)) {
						const fieldSchema = schema.controls[fieldId];
						recursiveCheck(fieldSchema, fields, path, schema);
					}
				}
			}

		};

		recursiveCheck(this.form, Object.keys(formProps), path);

		return formControls || this.form;
	}

	public getContextInUISchema(path: string): any {
		let ui: FormGroup;
		const uiProps = this.ui;
		const recursiveCheck = function (schema: any, fields: Array<string>, path: string, parent?: FormGroup) {

			for (let i = 0; i < fields.length; i++) {
				if (fields[i] === path) {
					ui = parent ? (<any>parent)[path] as FormGroup : parent;
					break;
				}
			}

			if (ui !== undefined) {
				return;
			}

			if (typeof schema === 'object') {
				fields = Object.keys(schema);

				for (const fieldId in schema) {
					if (schema.hasOwnProperty(fieldId)) {
						const fieldSchema = schema[fieldId];
						recursiveCheck(fieldSchema, fields, path, schema);
					}
				}
			}

		};

		recursiveCheck(this.ui, Object.keys(uiProps), path);

		return ui || this.ui;
	}
}
