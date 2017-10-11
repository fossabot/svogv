import { DemoMenuLabelItem } from './demo-menulabelitem';

/**
 * A regular, clickable element with text and icon.
 */
export class DemoMenuLinkItem extends DemoMenuLabelItem {
  __name__ = 'AcMenuLinkItem';
  link: Array<string>;
  constructor(text: string, link: string[], icon?: string) {
    super(text, icon);
    this.link = link;
  }
}
