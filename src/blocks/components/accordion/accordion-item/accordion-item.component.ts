import { Component, Input, OnDestroy } from '@angular/core';
import { AccordionComponent } from '../accordion.component';

/**
 * The accordion item dumb component
 */
@Component({
	selector: 'accordion-item',
	styleUrls: ['accordion-item.component.scss'],
	template: `
    <div class="accordion-item" [ngClass]="{'is-open': isOpen}">
      <div class="accordion__header" (click)="toggleOpen()">
          <span class="accordion__header-inner">
	          <ng-content select="[heading]"></ng-content>
          </span>
          <bb-icon [iconName]="'arrow'" [size]="'12px'" class="accordion__header-icon"></bb-icon>
      </div>
      <div class="accordion__content">
        <div class="accordion__content-inner">
          <ng-content select="[content]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class AccordionItemComponent implements OnDestroy {

	/**
	 * Receive the open state
	 */
	@Input() isOpen: boolean;

	/**
	 * Construct the accordion item component
	 * @param accordion
	 */
	constructor(private accordion: AccordionComponent) {
		this.accordion.addItem(this);
	}

	/**
	 * Remove the accordion item on destroy
	 */
	ngOnDestroy() {
		this.accordion.removeItem(this);
	}

	/**
	 * Alter the open state
	 */
	toggleOpen(): void {
		this.isOpen = !this.isOpen;
		this.accordion.closeOthers(this);
	}
}
