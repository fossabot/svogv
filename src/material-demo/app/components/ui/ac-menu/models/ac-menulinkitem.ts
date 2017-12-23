import { AcMenuLabelItem } from './ac-menulabelitem';

/**
 * A regular, clickable element with text and icon.
 */
export class AcMenuLinkItem extends AcMenuLabelItem {
  // tslint:disable-next-line:variable-name
  __name__ = 'AcMenuLinkItem';
  link: Array<string>;
  constructor(text: string, link: string[], icon?: string) {
    super(text, icon);
    this.link = link;
  }
}
