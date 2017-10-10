import { Injectable } from '@angular/core';
import { first } from 'rxjs/operator/first';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// AIzaSyCJ6ww5_pO7Z0eeg_dtWyGJGhgU2kRsAGA
const url = '//maps.googleapis.com/maps/api/js?key=<key>&callback=__onGoogleLoaded';

declare const google: any;

@Injectable()
export class GMapsApiLoader {
	api$: ReplaySubject<any> = first.call(new ReplaySubject(1));

	load(key: string) {
		if (this.isMapsApiLoaded()) {
			this.api$.next(google.maps);
		} else {
			this.addGoogleMapsApi(key);
			(<any>window)['__onGoogleLoaded'] = () => {
				this.api$.next(google.maps);
			};
		}
	}

	private addGoogleMapsApi(key: string) {
		const node = document.createElement('script');
		node.src = url.replace('<key>', key);
		node.type = 'text/javascript';
		document.querySelector('body').appendChild(node);
	}

	private isMapsApiLoaded() {
		console.log('maps api loaded:');
		return typeof google === 'object' && typeof google.maps === 'object';
	}
}


