import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*tslint:disable-next-line*/
import { } from '@types/googlemaps';

// Components
import {
	MapClusterComponent
	, MapDirectionsComponent
	, MapMarkerComponent
	, MapPopupComponent
	, MapComponent
	, GMapsApiLoader
	, MarkerComponent
} from './index';

@NgModule({
	imports: [
		RouterModule,
		CommonModule,
		BrowserModule,
		FormsModule,
		// Module
		ReactiveFormsModule,
		HttpModule
	],
	declarations: [
		// Components
		MarkerComponent,
		MapComponent,
		MapMarkerComponent,
		MapClusterComponent,
		MapPopupComponent,
		MapDirectionsComponent
	],
	providers: [
		GMapsApiLoader
	],
	exports: [
		// Components
		MarkerComponent,
		MapComponent,
		MapPopupComponent,
		MapDirectionsComponent,
		MapMarkerComponent,
		MapPopupComponent,
		MapClusterComponent
	]
})
export class SvogvMapsModule {

	constructor() {
	}
}
