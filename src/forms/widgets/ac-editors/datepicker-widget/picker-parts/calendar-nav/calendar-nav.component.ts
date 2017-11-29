import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dp-calendar-nav',
  templateUrl: './calendar-nav.component.html',
  styleUrls: ['./calendar-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarNavComponent {
  @Output() onLeftNav: EventEmitter<null> = new EventEmitter();
  @Output() onLeftSecondaryNav: EventEmitter<null> = new EventEmitter();
  @Output() onRightNav: EventEmitter<null> = new EventEmitter();
  @Output() onRightSecondaryNav: EventEmitter<null> = new EventEmitter();
  @Output() onLabelClick: EventEmitter<null> = new EventEmitter();
  @Input() label: string;
  @Input() isLabelClickable = false;
  @Input() showLeftNav = true;
  @Input() showLeftSecondaryNav = false;
  @Input() showRightNav = true;
  @Input() showRightSecondaryNav = false;
  @Input() leftNavDisabled = false;
  @Input() leftSecondaryNavDisabled = false;
  @Input() rightNavDisabled = false;
  @Input() rightSecondaryNavDisabled = false;
  @HostBinding('class') @Input() theme: string;

  leftNavClicked() {
    this.onLeftNav.emit();
  }

  leftSecondaryNavClicked() {
    this.onLeftSecondaryNav.emit();
  }

  rightNavClicked() {
    this.onRightNav.emit();
  }

  rightSecondaryNavClicked() {
    this.onRightSecondaryNav.emit();
  }

  labelClicked() {
    this.onLabelClick.emit();
  }
}
