import { Directive, HostListener } from '@angular/core';
import { BaseTooltipDirective } from './basetooltip.directive';

/**
 * The tooltip directive
 */
@Directive({
	selector: '[tooltip]'
})
export class TooltipDirective extends BaseTooltipDirective {

	/**
	 * Track the appearance to deal with the scroll event
	 * @type {boolean}
	 */
	private isShown = false;

	/**
	 * Override original create method to get the tooltip back
	 * @returns {any}
	 */
	create() {
		this.showDelay = this.delay || this.showDelay;
		this.tooltip = document.createElement('span');
		this.tooltip.className += 'ng-tooltip ng-tooltip-' + this.placement;
		this.tooltip.textContent = this.tooltipText;
		if (this.zIndex) {
			this.tooltip.style.zIndex = this.zIndex;
		}
		return this.tooltip;
	}

	@HostListener('focusin')
	@HostListener('mouseenter')
	onMouseEnter() {
		this.getElemPosition();
		document.querySelector('.r-page').appendChild(this.create());
		this.setPosition();
		this.isShown = true;
		this.show();
	}

	@HostListener('focusout')
	@HostListener('mouseleave')
	onMouseLeave() {
		this.isShown = false;
		this.hide();
	}

	@HostListener('touchmove')
	@HostListener('window:scroll', [])
	onWindowScroll() {
		if (this.isShown) {
			this.getElemPosition();
			this.setPosition();
		}
	}
}