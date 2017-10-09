export interface WidgetUiOptions {
	/**
	 * Optional classes which can be added to the widget by using UISchema
	 */
	'ui:classes'?: string;
	/**
	 * Optional description which can be added to the widget by using UISchema
	 */
	'ui:description'?: string;
	/**
	 * Optional placeholder which can be added to the widget by using UISchema
	 */
	'ui:placeholder'?: string;
	/**
	 * Optional options which can be added to the widget by using UISchema
	 */
	'ui:options'?: any;
	/**
	 * Optional display mode for error messages by using UISchema
	 */
	'ui:inline-errors'?: boolean;
	/**
	 * Optional , the  name  of the attribute expected by  API
	 */
	'ui:apiname'?: string;
}