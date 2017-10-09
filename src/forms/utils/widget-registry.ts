/**
 * Widget Registry Class
 */
export class WidgetRegistry {
	/**
	 * Widgets object
	 */
	private widgets: {[type: string]: any} = {};

	/**
	 * Default widget as fallback
	 */
	private defaultWidget: any;

	/**
	 * Set default widget
	 *
	 * @param {String} widget - Widget type
	 */
	setDefault(widget: any) {
		this.defaultWidget = widget;
	}

	/**
	 * Get default widget
	 *
	 * @return String
	 */
	getDefault() {
		return this.defaultWidget;
	}

	/**
	 * Check if widget is there
	 *
	 * @param {String} type - Widget you want to check
	 *
	 * @return Boolean
	 */
	has(type: string): boolean {
		return this.widgets.hasOwnProperty(type);
	}

	/**
	 * Register widget
	 *
	 * @param {String} type - Widget key/name
	 * @param {Object} widget - Component class
	 */
	register(type: string, widget: any) {
		this.widgets[type] = widget;
	}

	/**
	 * Get component by using name of widget
	 *
	 * @param {String} type - Widget name you want to get the component
	 *
	 * @return Object
	 */
	getType(type: string): any {

		if (this.has(type)) {
			return this.widgets[type];
		} else {
			console.error(`JsonForm :: Widget registry expects a valid type, but the type "${type}" is currently not defined!`);
		}


		return this.defaultWidget;
	}
}