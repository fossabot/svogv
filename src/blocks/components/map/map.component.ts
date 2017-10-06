import {AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, Output} from '@angular/core';
import 'js-marker-clusterer';
import {GMapsApiLoader} from './services/api-loader';

declare const google: any;

@Component({
	selector: 'bb-map',
	templateUrl: 'map.component.html',
	styleUrls: ['map.component.scss']
})
export class BBMapComponent implements AfterViewInit {

	/**
	 * Enable traffic layer
	 * @type {boolean}
	 */
	@Input() trafficLayer: boolean;

	/**
	 * Enables scroll wheel
	 */
	@Input() scrollwheel: boolean;

	/**
	 * Emits if map is ready
	 * @type {EventEmitter}
	 */
	@Output() public mapReady$: EventEmitter<google.maps.Map> = new EventEmitter();

	/**
	 * Emits on map zoom event
	 * @type {EventEmitter}
	 */
	@Output() public onZoom: EventEmitter<Event> = new EventEmitter();

	/**
	 * Map element
	 * @type {HTMLElement}
	 */
	public el: HTMLElement;

	/**
	 * Google map Object
	 * @type {google.maps.Map}
	 */
	public map: google.maps.Map;

	/**
	 * map has been fully initialized
	 * @type {boolean}
	 */
	public mapIdledOnce = false;

	public zoomed = false;

	/**
	 * Bounds for centering markers and custom overlays
	 */
	public bounds: google.maps.LatLngBounds;

	constructor(private elementRef: ElementRef,
				private apiLoader: GMapsApiLoader,
				private zone: NgZone) {
		apiLoader.load();
	}

	ngAfterViewInit() {
		this.apiLoader.api$.subscribe(() => this.initMap());
		this.mapReady$.subscribe(() => this.initEvents());
	}

	/**
	 * Bind google maps events to component events
	 */
	initEvents(): void {
		google.maps.event.addListenerOnce(this.map, 'mousemove', () => {
			google.maps.event.addListener(this.map, 'zoom_changed', () => {
				this.zone.run(() => {
					this.onZoom.emit(event);
					this.zoomed = true;
				});
			});
		});
	}

	/**
	 * Initialize Google map and emit map ready
	 */
	initMap(): void {
		this.el = this.elementRef.nativeElement.querySelector('[data-js-item="map-canvas"]');

		this.zone.runOutsideAngular(() => {

			const mapOptions = <google.maps.MapOptions>{
				center: {lat: -34.397, lng: 150.644},
				zoom: 8,
				disableDefaultUI: false,
				scrollwheel: (this.scrollwheel) ? this.scrollwheel : false,
				draggable: true,
				fullscreenControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP,
					style: google.maps.ZoomControlStyle.SMALL
				},
				fullscreenControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP,
				},
				mapTypeControlOptions: {
					position: google.maps.ControlPosition.TOP_CENTER
				},
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.LEFT_BOTTOM
				},
				streetViewControl: false,
				mapTypeControl: true,
				scaleControl: true
			};

			this.map = new google.maps.Map(this.el, mapOptions);
			this.map.addListener('idle', () => {
				google.maps.event.trigger(this.map, 'resize');

				if (!this.mapIdledOnce) {
					this.mapIdledOnce = true;
					setTimeout(() => {
						this.mapReady$.emit(this.map);
					});
				}
			});

			if (this.trafficLayer) {
				const trafficLayer = new google.maps.TrafficLayer();
				trafficLayer.setMap(this.map);
			}

			this.bounds = new google.maps.LatLngBounds();
		});
	}



	/**
	 * Return a specific map icon
	 * @param type
	 * @returns {string}
	 */
	getMarkerIcon(type: string): object {
		const icon = {url: '', anchor: '', scaledSize: ''};
		switch (type) {
			case 'origin':
				icon.url = '../../../assets/img/svg/cova_map_origin_marker.svg';
				icon.anchor = new google.maps.Point(18, 46);
				icon.scaledSize = new google.maps.Size(38, 50);
				break;
			case 'destination':
				icon.url = '../../../assets/img/svg/cova_map_destination_marker.svg';
				icon.anchor = new google.maps.Point(19, 19);
				icon.scaledSize = new google.maps.Size(38, 38);
				break;
			case 'disabled':
				icon.url = '../../../assets/img/svg/cova_map_marker_disabled.svg';
				icon.anchor = new google.maps.Point(18, 46);
				icon.scaledSize = new google.maps.Size(38, 50);
				break;
			default:
				icon.url = '../../../assets/img/svg/cova_map_marker.svg';
				icon.anchor = new google.maps.Point(18, 46);
				icon.scaledSize = new google.maps.Size(38, 50);
		}
		return icon;
	}

}
