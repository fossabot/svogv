import { DemoMenuItem } from './demo-menuitem';

/**
 * Base class for menu items.
 */
export class DemoMenuDividerItem extends DemoMenuItem {
  text: string;
  __name__ = 'AcMenuDividerItem';
  constructor() {
    super('');
  }
}
