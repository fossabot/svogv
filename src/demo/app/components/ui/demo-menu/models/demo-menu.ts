import { DemoMenuItem } from './demo-menuitem';

/**
 * The menu container, can provide a recursive list of menu items.
 */
export class DemoMenu {
  public children: Array<DemoMenuItem>;

  constructor(...items: Array<DemoMenuItem>) {
    this.children = items;
  }

  // Get the item and return null if not of expected subtype, or text not unique, or not found.
  getMenuItem<T extends DemoMenuItem>(name: string): T {
    let foundItems = this.children.filter(item => item.text === name);
    if (foundItems.length === 1) {
      return foundItems[0] as T;
    }
    return null;
  };

}
