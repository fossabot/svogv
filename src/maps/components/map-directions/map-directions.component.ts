import { Component, Input, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';

declare const google: any;

@Component({
	selector: 'ac-map-directions',
	template: ''
})
export class MapDirectionsComponent implements OnInit {

	@Input() markers: any;

	constructor(private mapComponent: MapComponent) {

	}

	ngOnInit() {
		if (this.mapComponent.mapIdledOnce) {
			this.initJourney(this.mapComponent.map);
		} else {
			this.mapComponent.mapReady$.subscribe((map) => this.initJourney(map));
		}
	}

	initJourney(map: google.maps.Map) {
		const path = new google.maps.Polyline({
			path: this.markers,
			geodesic: true,
			strokeColor: '#808890',
			strokeWeight: 5,
			strokeOpacity: 0.7
		});

		path.setMap(map);
	}
}
