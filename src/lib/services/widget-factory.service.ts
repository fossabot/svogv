import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { WidgetRegistry } from '../utilities/widget-registry';

@Injectable()
export class WidgetFactoryService {
	/**
	 * Factory
	 */
	factory: any;

	/**
	 * Constructor
	 *
	 * which injects widget-registry service and component-factory-resolver
	 */
	constructor(private widgetRegistry: WidgetRegistry, private componentFactoryResolver: ComponentFactoryResolver) {

	}

	/**
	 * Create dynamic component
	 *
	 * @param {ViewContainerRef} container - Container which resolves component
	 * @param {String} type - Component/Widget type
	 */
	public create(container: ViewContainerRef, type: string): ComponentRef<any> {
		const component = this.widgetRegistry.getType(type);
		this.factory = this.componentFactoryResolver.resolveComponentFactory(component);

		return container.createComponent(this.factory);
	}
}
