import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { getCustomOverlayView } from '../map/api/gmaps-marker';
import { BBMapComponent } from '../map/map.component';

@Component({
	selector: 'bb-map-popup',
	templateUrl: 'map-popup.component.html',
	styleUrls: ['map-popup.component.scss']
})
export class MapPopupComponent implements OnInit, OnChanges, OnDestroy {

	@Input() data: any;

	private el: HTMLElement;
	private position: google.maps.LatLng;
	private popup: any;
	private subscription: Subscription;

	constructor(private mapComponent: BBMapComponent,
				private elementRef: ElementRef) {
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

	initialize(map) {
		this.el = this.elementRef.nativeElement;
		this.position = new google.maps.LatLng(this.data.lat, this.data.lng);
		this.popup = getCustomOverlayView(this.el, this.position);
		this.popup.setMap(map);
	}

	ngOnChanges(change: SimpleChanges) {
		if (this.popup) {
			this.position = new google.maps.LatLng(this.data.lat, this.data.lng);
			this.popup.setPosition(this.position);
		}
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}

		if (this.popup !== undefined) {
			this.popup.setMap(null);
		}
	}
}
