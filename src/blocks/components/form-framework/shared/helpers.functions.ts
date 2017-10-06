export function isObject(item: any): boolean {
	return item !== null && typeof item === 'object' &&
		Object.prototype.toString.call(item) === '[object Object]';
}

export function isArray(item: any): boolean {
	return Array.isArray(item) ||
		Object.prototype.toString.call(item) === '[object Array]';
}

export function isString(value: any): value is string {
	return typeof value === 'string';
}

export function hasOwn(object: any, property: string): boolean {
	if (!isObject(object) && !isArray(object)) {
		return false;
	}
	return object.hasOwnProperty(property);
}

/**
 * 'buildTitleMap' function
 *
 * @param {any} titleMap -
 * @param {any} enumList -
 * @param {boolean = false} fieldRequired -
 * @return {{name: string, value: any}[]}
 */
export function buildTitleMap(titleMap: any, enumList: any, fieldRequired: boolean = true): { name: string, value: any }[] {
	let newTitleMap: { name: string, value: any }[] = [];
	let hasEmptyValue = false;
	if (titleMap) {
		if (isArray(titleMap)) {
			if (enumList) {
				for (const i of Object.keys(titleMap)) {
					if (isObject(titleMap[i])) { // JSON Form / Angular Schema Form style
						const value: any = titleMap[i].value;
						if (enumList.indexOf(value) !== -1) {
							const name: string = titleMap[i].name;
							newTitleMap.push({name, value});
							if (!value) {
								hasEmptyValue = true;
							}
						}
					} else if (isString(titleMap[i])) { // React Jsonschema Form style
						if (i < enumList.length) {
							const name: string = titleMap[i];
							const value: any = enumList[i];
							newTitleMap.push({name, value});
							if (!value) {
								hasEmptyValue = true;
							}
						}
					}
				}
			} else { // If array titleMap and no enum list, just return the titleMap
				newTitleMap = titleMap;
				if (!fieldRequired) {
					hasEmptyValue = !!newTitleMap.filter(i => !i.value).length;
				}
			}
		} else if (enumList) { // Alternate JSON Form style, with enum list
			for (const i of Object.keys(enumList)) {
				const value: any = enumList[i];
				if (hasOwn(titleMap, value)) {
					const name: string = titleMap[value];
					newTitleMap.push({name, value});
					if (!value) {
						hasEmptyValue = true;
					}
				}
			}
		} else { // Alternate JSON Form style, without enum list
			for (const value of Object.keys(titleMap)) {
				const name: string = titleMap[value];
				newTitleMap.push({name, value});
				if (!value) {
					hasEmptyValue = true;
				}
			}
		}
	} else if (enumList) { // Build map from enum list alone
		for (const i of Object.keys(enumList)) {
			const name: string = enumList[i];
			const value: any = enumList[i];
			newTitleMap.push({name, value});
			if (!value) {
				hasEmptyValue = true;
			}
		}
	} else { // If no titleMap and no enum list, return default map of boolean values
		newTitleMap = [{name: 'True', value: true}, {name: 'False', value: false}];
	}
	/* This adds an empty item, we handle this manually in the json schema
	 if (!fieldRequired && !hasEmptyValue) {
	 newTitleMap.unshift({name: '', value: ''});
	 debugger
	 }
	 */
	return newTitleMap;
}
