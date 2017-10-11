import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

import { MarkerViewModel } from './marker.viewmodel';

/**
 * The MarkerComponent
 *
 * @export
 * @class BBMarkerComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'ac-marker',
	templateUrl: 'marker.component.html',
	styleUrls: ['marker.component.scss'],
})

export class MarkerComponent implements OnInit {

	/**
	 * Disable capttion text
	 */
	@Input() public disableCaption = false;

	public iconName: string;

	public readonly markerLevel: { [key: string]: string } = {
		'ERROR': 'fa-danger',
		'WARNING': 'fa-warning',
		'NOTICE': 'fa-success',
		'INFO': 'fa-info'
	};

	@Input() public vm: MarkerViewModel;
	@Input() public iconSize: string;
	@Input() public markerSize = '30px';
	@HostBinding('class.is-deactivated') @Input() public inactive: boolean;

	constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

	/**
	 * Init styles for Icons component
	 */
	ngOnInit() {
		if (!this.vm.type.startsWith('fa-')) {
			this.vm.type = `fa-${this.vm.type}`;
		}
		this.iconName = this.vm.type || 'fa-close';
		this.renderer.addClass(this.elementRef.nativeElement, this.markerLevel[this.vm.level] || 'fa-info');
	}

}
