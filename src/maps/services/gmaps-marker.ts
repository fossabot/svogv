export class GMapsMarker extends google.maps.OverlayView {

	htmlEl: HTMLElement;
	position: google.maps.LatLng; // TODO Interface
	private zIndex: string;
	private visible = true;

	constructor(htmlEl: HTMLElement, position: google.maps.LatLng) {
		super();
		this.htmlEl = htmlEl;
		this.position = position;
	}

	onAdd(): void {
		this.getPanes().overlayMouseTarget.appendChild(this.htmlEl);

		// required for correct display inside google maps container
		this.htmlEl.style.position = 'absolute';
	}

	draw(): void {
		this.setPosition(this.position);
		this.setZIndex(this.zIndex);
		this.setVisible(this.visible);
	}

	onRemove(): void {
		//
	}

	getPosition() {
		return this.position;
	};

	/* tslint:disable-next-line */
	setPosition = (position?: google.maps.LatLng) => {
		this.position = position;
		this.htmlEl.style.visibility = 'hidden';

		if (this.getProjection() && typeof this.position.lng === 'function') {
			const positionOnMap = () => {
				const posPixel = this.getProjection().fromLatLngToDivPixel(this.position);
				const x = Math.round(posPixel.x - (this.htmlEl.offsetWidth / 2));
				const y = Math.round(posPixel.y - this.htmlEl.offsetHeight / 2);
				this.htmlEl.style.left = x + 'px';
				this.htmlEl.style.top = y + 'px';
				this.htmlEl.style.visibility = 'visible';
			};

			if (this.htmlEl.offsetWidth && this.htmlEl.offsetHeight) {
				positionOnMap();
			} else {
				setTimeout(() => positionOnMap());
			}
		}
	}

	setZIndex(zIndex: string): void {
		this.zIndex = zIndex;
		this.htmlEl.style.zIndex = this.zIndex;
	}

	setVisible(visible: boolean) {
		this.htmlEl.style.display = visible ? 'inline-block' : 'none';
		this.visible = visible;
	};

	setMap(map: google.maps.Map | null): void {
		super.setMap(map);
		this.setVisible(!!map);
	}
}


/**
 * Wrapper to a create extend OverlayView at runtime, only after google maps is loaded.
 * Otherwise throws a google is unknown error.
 */
export function getCustomOverlayView(htmlEl: HTMLElement, position: google.maps.LatLng) {

	return new GMapsMarker(htmlEl, position);
}
