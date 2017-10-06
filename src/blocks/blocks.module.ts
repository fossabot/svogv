/*tslint:disable-next-line*/
import {} from '@types/googlemaps';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { JsonSchemaFormModule } from 'angular2-json-schema-form';
import { MarkdownModule } from 'angular2-markdown';
import { MomentModule } from 'angular2-moment';
import { DropdownModule } from '../dropdown/dropdown.module';
import { DataSetModule } from './components/data-set/data-set.module';

// Components
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { TagsComponent } from '../../components/tags/tags.component';
import { AccordionItemComponent } from './components/accordion/accordion-item/accordion-item.component';
import { ButtonComponent } from './components/button/button.component';
import { BBHorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { CtaComponent } from './components/cta/cta.component';
import { DescriptionItemComponent } from './components/description-item/description-item.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BBFlyOutItemComponent } from './components/fly-out/fly-out-item/fly-out-item.component';
import { FlyOutComponent } from './components/fly-out/fly-out.component';
import { IconComponent } from './components/icon/icon.component';
import { LinkComponent } from './components/link/link.component';
import { ListFooterComponent } from './components/list-footer/list-footer.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ListItemComponent } from './components/list-view/list-item/list-item.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { MapClusterComponent } from './components/map-cluster/map-cluster.component';
import { MapDirectionsComponent } from './components/map-directions/map-directions.component';
import { MapMarkerComponent } from './components/map-marker/map-marker.component';
import { MapPopupComponent } from './components/map-popup/map-popup.component';
import { MapComponent } from './components/map/map.component';
import { GMapsApiLoader } from './components/map/services/api-loader';
import { MarkerComponent } from './components/marker/marker.component';
import { OrderWidgetComponent } from './components/order-widget/order-widget.component';
import { PictureTextComponent } from './components/picture-text/picture-text.component';
import { PictureComponent } from './components/picture/picture.component';
import { PillComponent } from './components/pill/pill.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TextComponent } from './components/text/text.component';
import { UiSwitchComponent } from './components/ui-switch/ui-switch.component';
import { LinksToRouterDirective } from './directives/links-to-router.directive';

// Services
import { WindowSizeService } from './services/windowSize.service';

// Pipes
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';
import { TooltipDirective } from 'ng2-tooltip-directive/components';
import { TranslateModule } from 'ng2-translate';
import { I18nService } from '../../services/i18n.service';
import { NorwayCompanyApiService } from '../../services/norway_company.service';
import { AccordionComponent } from './components/accordion/accordion.component';
import { GpsComponent } from './components/gps/gps.component';
import { ShowAtDirective } from './directives/showAt.directive';
import { AcTooltipDirective } from './directives/tooltip.directive';
import { ArrayToStringConverter } from './pipes/array-to-string.pipe';
import { CalculateThreshold } from './pipes/calculate-threshold.pipe';
import { ChartValueNormalizer } from './pipes/chart-value-normalizer.pipe';
import { DateCustomPipe } from './pipes/date-custom.pipe';
import { I18nPipe } from './pipes/i18n.pipe';
import { OrderBy } from './pipes/order-by.pipe';
import { ReverseOrderPipe } from './pipes/reverse-order.pipe';
import { ShowNumberOfChars } from './pipes/show-nr-chars.pipe';


@NgModule({
	imports: [
		RouterModule,
		CommonModule,
		BrowserModule,
		FormsModule,
		// Module
		ReactiveFormsModule,
		MomentModule,
		DropdownModule,
		MarkdownModule.forRoot(),
		JsonSchemaFormModule,
		HttpModule,
		Ng2PageScrollModule.forRoot(),
		DpDatePickerModule,
		AngularSvgIconModule,
		DataSetModule,
		TranslateModule
	],
	declarations: [
		// Components
		DynamicFormComponent,
		CtaComponent,
		PictureComponent,
		PictureTextComponent,
		TextComponent,
		IconComponent,
		MarkerComponent,
		HorizontalBarChartComponent,
		MapComponent,
		ListViewComponent,
		ListItemComponent,
		ListFooterComponent,
		ListHeaderComponent,
		OrderWidgetComponent,
		LinkComponent,
		UiSwitchComponent,
		FlyOutComponent,
		FlyOutItemComponent,
		DescriptionItemComponent,
		MapMarkerComponent,
		MapClusterComponent,
		MapPopupComponent,
		MapDirectionsComponent,
		ButtonComponent,
		PillComponent,
		GpsComponent,
		TabsComponent,
		TagsComponent,
		AccordionComponent,
		AccordionItemComponent,
		// Directives & Pipes
		DateCustomPipe,
		ReverseOrderPipe,
		OrderBy,
		I18nPipe,
		ChartValueNormalizer,
		ArrayToStringConverter,
		CalculateThreshold,
		TooltipDirective,
		AcTooltipDirective,
		ShowAtDirective,
		ShowNumberOfChars,
		LinksToRouterDirective,
		PreloaderComponent,
		BBDialogComponent
	],
	entryComponents: [
		DialogComponent
	],
	providers: [
		GMapsApiLoader,
		WindowSizeService,
		I18nService,
		NorwayCompanyApiService
	],
	exports: [
		// Module
		TranslateModule,
		Ng2PageScrollModule,
		AngularSvgIconModule,
		DpDatePickerModule,
		DropdownModule,
		// Components
		DynamicFormComponent,
		SchemaFormComponent,
		CtaComponent,
		PictureComponent,
		PictureTextComponent,
		TextComponent,
		IconComponent,
		MarkerComponent,
		HorizontalBarChartComponent,
		MapComponent,
		FlyOutComponent,
		FlyOutItemComponent,
		MapPopupComponent,
		MapDirectionsComponent,
		MapMarkerComponent,
		MapPopupComponent,
		ListViewComponent,
		ListItemComponent,
		ListFooterComponent,
		ListHeaderComponent,
		OrderWidgetComponent,
		MapClusterComponent,
		OrderWidgetComponent,
		ButtonComponent,
		PillComponent,
		LinkComponent,
		GpsComponent,
		TabsComponent,
		TagsComponent,
		UiSwitchComponent,
		MarkerComponent,
		DescriptionItemComponent,
		AccordionComponent,
		AccordionItemComponent,
		// Directives & Pipes
		DateCustomPipe,
		ReverseOrderPipe,
		OrderBy,
		I18nPipe,
		ChartValueNormalizer,
		ArrayToStringConverter,
		CalculateThreshold,
		AcTooltipDirective,
		ShowAtDirective,
		ShowNumberOfChars,
		LinksToRouterDirective,
		DataSetModule,
		PreloaderComponent,
		DialogComponent
	]
})
export class BlocksModule {

	constructor() {
		// PageScrollConfig.defaultDuration = 300;
	}
}
