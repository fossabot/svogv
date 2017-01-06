﻿export function Pattern(pattern: RegExp, msg?: string) {
    // the original decorator
    function patternInternal(target: Object, property: string | symbol): void {
        patternInternalSetup(target, property.toString(), pattern, msg);
    }

    // return the decorator
    return patternInternal;
}

function patternInternalSetup(target: any, key: string, reg: RegExp, msg?: string) {

    // property getter
    var getter = function (): any {
        return _val;
    };

    // property setter
    var setter = function (newVal: any) {
        _val = newVal;
    };

    // remember current value, if any
    var _val = (<any>target)[key];
    // Delete property.
    if (delete (<any>target)[key]) {
        // Create new property with getter and setter and meta data provider
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });

        // create a helper property to transport a meta data value
        Object.defineProperty(target, `__hasPattern__${key}`, {
            value: reg,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errPattern__${key}`, {
            value: msg || `The field ${key} must fullfill the pattern ${reg}`,
            enumerable: false,
            configurable: false
        });
    }
}