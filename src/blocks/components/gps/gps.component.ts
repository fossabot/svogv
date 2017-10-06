import { Component, Input, OnInit } from '@angular/core';

/**
 * Render the vehicle GPS status.
 *
 * @export
 * @class GpsComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'ac-gps',
	templateUrl: 'gps.component.html',
	styleUrls: ['gps.component.scss']
})

export class GpsComponent implements OnInit {


	@Input() activeGps: boolean;

	ngOnInit() {
	}

}
