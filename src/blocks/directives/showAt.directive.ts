import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({selector: '[appShowAt]'})
export class ShowAtDirective {

	private hasView = false;
	private condition: any;

	constructor(private templateRef: TemplateRef<any>,
				private viewContainer: ViewContainerRef) {

	}

	@Input() set appShowAt(condition: any) {
		this.condition = condition;
		this.checkConditions(window);

		window.addEventListener('resize', (event) => {
			this.checkConditions(event.target);
		});
	}


	private checkMinMaxCondition(target: any) {
		if (this.condition.max && this.condition.min) {
			return target.innerWidth > this.condition.min && target.innerWidth < this.condition.max;
		} else if (this.condition.min) {
			return target.innerWidth > this.condition.min;
		} else if (this.condition.max) {
			return target.innerWidth <= this.condition.max;
		} else {
			return true;
		}
	}

	checkConditions(target: any) {
		if (this.checkMinMaxCondition(target) && !this.hasView) {
			this.show();
		} else if (!this.checkMinMaxCondition(target) && this.hasView) {
			this.hide();
		}
	}

	hide() {
		this.viewContainer.clear();
		this.hasView = false;
	}

	show() {
		this.viewContainer.createEmbeddedView(this.templateRef);
		this.hasView = true;
	}
}
