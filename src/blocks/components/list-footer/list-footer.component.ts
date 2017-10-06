import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'list-footer',
	templateUrl: 'list-footer.component.html',
	styleUrls: ['list-footer.component.scss']
})
export class ListFooterComponent implements OnInit {

	/**
	 * IsFixed property determines if the list-footer is fixed
	 */
	public isFixed = true;

	/**
	 * FooterHeight stores the height of the page footer
	 */
	private footerHeight = document.getElementById('r-footer').offsetHeight;

	/**
	 * @HostListener: FooterHeight stores the height of the page footer
	 */
	@HostListener('window:resize', [])
	@HostListener('window:scroll', [])
	setFooterState() {
		// calculate when footer should be displayed fixed
		this.isFixed = (window.scrollY || window.pageYOffset) + window.innerHeight < (document.body.scrollHeight - this.footerHeight);
	}

	ngOnInit() {
		this.setFooterState();
	}
}
