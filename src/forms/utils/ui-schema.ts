/**
 * Provides a collection of classes to make the overall design more
 * flexible and indepentend of Bootstrap. Just provide distinct classes
 * for your main framework. 
 */
export interface IUISchema {
  common?: {
    container?: string,
    row?: string,
  };
  grid?: {

  };
  editor?: {
    formLabel?: string,
    formControl?: string,
    formGroup?: string,
    formValidationWarningIcon?: string,
    formValidationWarningText?: string
  };
  infobox?: {

  };
  treeview?: {

  }
}

/**
 * Base class for UISchema. Derive from this to make custom UI class.
 */
export abstract class UISchema implements IUISchema {
  common = {
    container: 'container',
    row: 'row'
  };
}

/**
 * A default schema for Bootstrap 4. Just override by applying to the form elements
 * using the the property 'uischema' and an instance of a class derived from @see UISchema.
 */
export class UISchemaBootstrap extends UISchema {
  editor = {
    formLabel: 'col-form-label col-md-3 col-sm-10',
    formControl: 'form-control',
    formGroup: 'form-group row',
    formValidationWarningIcon: 'fa fa-warning text-danger form-control-feedback',
    formValidationWarningText: 'text-danger'
  };
}
