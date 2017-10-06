import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MapClusterComponent } from '../map-cluster/map-cluster.component';
import { getCustomOverlayView } from '../map/api/gmaps-marker';
import { BBMapComponent } from '../map/map.component';

declare const google: any;

@Component({
	selector: 'bb-map-marker',
	templateUrl: 'map-marker.component.html',
	styleUrls: ['map-marker.component.scss']
})
export class MapMarkerComponent implements OnInit, OnDestroy {

	/**
	 * element ref
	 */
	private el: HTMLElement;

	/**
	 * google Lat/Lng position
	 */
	private position: google.maps.LatLng;

	/**
	 * Map ready subscription
	 */
	private subscription: Subscription;

	/**
	 * Custom marker overlay
	 */
	marker: any;

	/**
	 * Latitude
	 */
	@Input() lat: number;

	/**
	 * Longitude
	 */
	@Input() lng: number;

	/**
	 * Additional marker data
	 */
	@Input() data: any;

	/**
	 * Marker toggled event emitter
	 * @type {EventEmitter}
	 */
	@Output() markerToggled = new EventEmitter();

	constructor(private mapComponent: BBMapComponent,
				private elementRef: ElementRef,
				private mapCluster: MapClusterComponent) {
	}

	/**
	 * Creates custom google overlay for marker when map is ready
	 */
	ngOnInit() {
		if (this.mapComponent.mapIdledOnce) {
			this.initialize(this.mapComponent.map);
		} else {
			this.subscription = this.mapComponent.mapReady$.subscribe(map => this.initialize(map));
		}
	}

	/**
	 * Creates custom overlay and add ist to clustering/map
	 * @param map
	 */
	private initialize(map): void {

		if (!this.marker) {
			this.el = this.elementRef.nativeElement;
			this.position = new google.maps.LatLng(this.lat, this.lng);
			this.marker = getCustomOverlayView(this.el, this.position);
			this.mapCluster.clusterer.addMarker(this.marker);

			if (!this.mapComponent.zoomed) {
				this.mapComponent.bounds.extend(this.marker.getPosition());
				map.fitBounds(this.mapComponent.bounds);
			}
		}
	}

	/**
	 * Emit marker data on click
	 * @param $event
	 */
	@HostListener('click', ['$event'])
	click($event: MouseEvent) {
		$event.stopPropagation();
		const head = document.querySelector('head');
		const size = window.getComputedStyle(head, null).getPropertyValue('font-family');

		this.mapComponent.map.panTo(this.marker.getPosition());
		this.mapComponent.map.panBy(0, (size === 'desktop') ? -30 : 70);

		this.markerToggled.emit({
			'lat': this.lat,
			'lng': this.lng,
			'data': this.data
		});
	}

	/**
	 * Destroy marker
	 * Unsubscribe from map ready event so that the marker will not be added if its already destroyed.
	 * If the marker already exists it will be removed from map
	 */
	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}

		if (this.marker !== undefined) {
			this.mapCluster.clusterer.removeMarker(this.marker);
		}
	}
}
