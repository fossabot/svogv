import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 *
 * Intercepts navigation of unbound links
 *
 * Dynamically loaded or user entered content is not bound by angular
 * including router binding of links.
 *
 *
 * This directive intercepts clicks on none-router-bound anchors and
 * forwards href attribute value to angular's router if
 *
 *  - no target attribute specified
 *  - not already bound to router
 *
 *
 * Targets host and children elements.
 *
 *
 * @param {boolean} asExternalLinks  if true will open a new tab
 *
 *
 * In following example anchors are being generated from markdown and
 * therefore not bound to the router. Adding links-to-router directive
 * prevents reloading app.
 *
 *
 * @example
 * <markdown links-to-router></markdown>
 *
 * Adding asExternalLinks param opens links in new tab
 *
 * @example
 * <markdown links-to-router [asExternalLinks]></markdown>
 *
 */

@Directive({
	selector: '[links-to-router]'
})
export class LinksToRouterDirective {

	@Input()
	asExternalLinks: boolean;

	constructor(private router: Router) {
	}

	@HostListener('click', ['$event'])
	onHostClick($event: MouseEvent) {

		const el = $event.target as HTMLAnchorElement;
		const anchor: HTMLAnchorElement = el && el.tagName === 'A' ? el : null;
		const href: string = anchor ? anchor.href : null;
		const isMailto: boolean = href.indexOf('mailto:') === 0;
		const target: string = el.getAttribute('target');

		// intercept click events on <a> if href is given
		if (!href) {
			return;
		} else {
			$event.preventDefault();
			$event.stopPropagation();
		}

		// open in new tab if asExternalLinks is true or href is mailto:
		if (this.asExternalLinks || isMailto) {
			if (!target) {
				window.open(href);
			}
		} else if (!el.getAttribute('routerLink')) {
			// else redirect to router
			this.router.navigateByUrl(href);
		}
	}
}
