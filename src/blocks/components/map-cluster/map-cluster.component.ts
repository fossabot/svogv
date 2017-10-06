import { Component, Input, OnInit } from '@angular/core';
import { BBMapComponent } from '../map/map.component';
import { MapMarkerClusterer } from './map-clusterer';


@Component({
	selector: 'bb-map-cluster',
	template: '<ng-content></ng-content>',
	styleUrls: ['map-cluster.component.scss']
})
export class MapClusterComponent implements OnInit {

	@Input() positions: Array<any>;
	public clusterer: any;

	private clustererOptions: object = {
		styles: [{
			height: 100,
			url: 'assets/img/cova_marker-cluster1.png',
			width: 72,
			textColor: '#808890',
			anchor: [13, 15],
			backgroundPosition: '-18px -25px'
		}, {
			height: 100,
			url: 'assets/img/cova_marker-cluster1.png',
			width: 72,
			textColor: '#808890',
			anchor: [13, 13],
			backgroundPosition: '-18px -25px'
		}]
	};

	constructor(private mapComponent: BBMapComponent) {

	}

	ngOnInit() {
		this.mapComponent.mapReady$.subscribe((map) => this.initCluster(map));
	}

	initCluster(map) {
		this.clusterer = new MapMarkerClusterer(map, this.positions, this.clustererOptions);
	}

}
