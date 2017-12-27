import { Component, Input } from '@angular/core';
import { AcMenu } from './models/ac-menu';

@Component({
  moduleId: module.id,
  selector: 'ac-sidemenu',
  styles: ['.spacer { padding-left: 16px; cursor: hand; }'],
  templateUrl: './ac-sidemenu.component.html'
})
export class AcSideMenuComponent {

  /**
   * The menu's data.
   */
  @Input() menu: AcMenu;
  /**
   * Format links so they use [routerlink] syntax. Default is true.
   */
  @Input() useRouterLinks = true;

  constructor() {
    console.log('AcSideMenu ctor');
    // create Menu dynamically
  }

  // tslint:disable-next-line:no-unused-variable
  private itemType(item: any): string {
    if (item === undefined || item === null) {
      throw new Error('The reflection metadata could not be found.');
    }
    let itemType: string = item['__name__'];
    return itemType;
  }


}
