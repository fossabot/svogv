import { DemoMenuHeaderItem } from './demo-menuheaderitem';

/**
 * A non clickable item in the menu, can provide an icon.
 */
export class DemoMenuLabelItem extends DemoMenuHeaderItem {
  __name__ = 'AcMenuLabelItem';
  icon: string;
  constructor(text: string, icon?: string) {
    super(text);
    this.icon = icon;
  }
}
