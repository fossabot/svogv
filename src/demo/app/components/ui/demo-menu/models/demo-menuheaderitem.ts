import { DemoMenuItem } from './demo-menuitem';

/**
 * A header, not clickable element in the menu
 */
export class DemoMenuHeaderItem extends DemoMenuItem {
  __name__ = 'DemoMenuHeaderItem';
  constructor(text: string) {
    super(text);
  }
}
