import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

export type indexType = { [key: string]: string };

/**
 * Creates the MarkerComponent.
 *
 * @export
 * @class MarkerComponent
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

	public readonly markerType: indexType = {
		'SERVICE': 'fuel-pump',
		'REMINDER': 'date',
		'HIGHFUELCONSUMPTION': 'fuel-pump',
		'LOWSCORE': 'score',
		'MULTIPLE': 'fuel-pump',
		'ROUTE': 'route',
		'LICENSEUPLOADED': 'driver_license',
		'LICENSEREMINDER': 'driver_license',
		'WARNING': 'warning'
	};

	public readonly markerLevel: indexType = {
		'ERROR': 'is-danger',
		'WARNING': 'is-warning',
		'NOTICE': 'is-success',
		'INFO': 'is-info'
	};

	@Input() public vm: any;
	@Input() public iconSize: any;
	@Input() public markerSize = '30px';
	@HostBinding('class.is-deactivated') @Input() public inactive;

	constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

	/**
	 * Inits sytles  for Icons component
	 * @memberof MarkerComponent
	 */
	ngOnInit() {
		this.iconName = this.markerType[this.vm.type] || 'fuel-pump';
		this.renderer.addClass(this.elementRef.nativeElement, this.markerLevel[this.vm.level] || 'is-info');
	}

}
