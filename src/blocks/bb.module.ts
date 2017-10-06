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
import { BBCtaComponent } from './components/cta/cta.component';
import { BBDescriptionItemComponent } from './components/description-item/description-item.component';
import { BBDialogComponent } from './components/dialog/dialog.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BBFlyOutItemComponent } from './components/fly-out/fly-out-item/fly-out-item.component';
import { BBFlyOutComponent } from './components/fly-out/fly-out.component';
import { BBFormFrameworkComponent } from './components/form-framework/bb-form-framework.component';
import { BBCheckboxComponent } from './components/form-framework/checkbox/bb-checkbox.component';
import { BBEmailComponent } from './components/form-framework/email/bb-email.component';
import { BBFieldsetComponent } from './components/form-framework/fieldset/bb-fieldset.component';
import { BBInputNorwayComponent } from './components/form-framework/input-norway/bb-input-norway.component';
import { BBInputComponent } from './components/form-framework/input/bb-input.component';
import { BBRadioComponent } from './components/form-framework/radio/bb-radio.component';
import { BBSelectComponent } from './components/form-framework/select/bb-select.component';
import { BBSubmitComponent } from './components/form-framework/submit/bb-submit.component';
import { BBWizardStepComponent } from './components/form-framework/wizard/bb-wizard-step.component';
import { BBWizardComponent } from './components/form-framework/wizard/bb-wizard.component';
import { BBRootComponent } from './components/form-framework/wrappers/bb-root.component';
import { BBSchemaFormComponent } from './components/form-framework/wrappers/bb-schema-form.component';
import { BBSelectFrameworkComponent } from './components/form-framework/wrappers/bb-select-framework.component';
import { BBSelectWidgetComponent } from './components/form-framework/wrappers/bb-select-widget.component';
import { BBIconComponent } from './components/icon/icon.component';
import { LinkComponent } from './components/link/link.component';
import { ListFooterComponent } from './components/list-footer/list-footer.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ListItemComponent } from './components/list-view/list-item/list-item.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { MapClusterComponent } from './components/map-cluster/map-cluster.component';
import { MapDirectionsComponent } from './components/map-directions/map-directions.component';
import { MapMarkerComponent } from './components/map-marker/map-marker.component';
import { MapPopupComponent } from './components/map-popup/map-popup.component';
import { BBMapComponent } from './components/map/map.component';
import { GMapsApiLoader } from './components/map/services/api-loader';
import { BBMarkerComponent } from './components/marker/marker.component';
import { OrderWidgetComponent } from './components/order-widget/order-widget.component';
import { BBPictureTextComponent } from './components/picture-text/picture-text.component';
import { BBPictureComponent } from './components/picture/picture.component';
import { PillComponent } from './components/pill/pill.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { BBTextComponent } from './components/text/text.component';
import { BBUiSwitchComponent } from './components/ui-switch/ui-switch.component';
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
import { CovaTooltipDirective } from './directives/tooltip.directive';
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
		BBCtaComponent,
		BBPictureComponent,
		BBPictureTextComponent,
		BBTextComponent,
		BBIconComponent,
		BBMarkerComponent,
		BBHorizontalBarChartComponent,
		BBMapComponent,
		ListViewComponent,
		ListItemComponent,
		ListFooterComponent,
		ListHeaderComponent,
		OrderWidgetComponent,
		LinkComponent,
		BBUiSwitchComponent,
		BBFlyOutComponent,
		BBFlyOutItemComponent,
		BBDescriptionItemComponent,
		// Forms
		BBFormFrameworkComponent,
		BBInputComponent,
		BBEmailComponent,
		BBSelectComponent,
		BBCheckboxComponent,
		BBRadioComponent,
		BBSchemaFormComponent,
		BBRootComponent,
		BBSelectFrameworkComponent,
		BBSelectWidgetComponent,
		BBFieldsetComponent,
		BBWizardComponent,
		BBWizardStepComponent,
		BBInputNorwayComponent,
		BBSubmitComponent,
		BBTextComponent,
		BBCtaComponent,
		BBPictureComponent,
		BBPictureTextComponent,
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
		CovaTooltipDirective,
		ShowAtDirective,
		ShowNumberOfChars,
		LinksToRouterDirective,
		PreloaderComponent,
		BBDialogComponent
	],
	entryComponents: [
		BBFieldsetComponent,
		BBFormFrameworkComponent,
		BBInputComponent,
		BBEmailComponent,
		BBSelectWidgetComponent,
		BBSelectComponent,
		BBCheckboxComponent,
		BBRadioComponent,
		BBInputNorwayComponent,
		BBWizardComponent,
		BBWizardStepComponent,
		BBSubmitComponent,
		BBDialogComponent
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
		BBSchemaFormComponent,
		BBCtaComponent,
		BBPictureComponent,
		BBPictureTextComponent,
		BBTextComponent,
		BBIconComponent,
		BBMarkerComponent,
		BBHorizontalBarChartComponent,
		BBMapComponent,
		BBFlyOutComponent,
		BBFlyOutItemComponent,
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
		BBUiSwitchComponent,
		BBMarkerComponent,
		BBDescriptionItemComponent,
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
		CovaTooltipDirective,
		ShowAtDirective,
		ShowNumberOfChars,
		LinksToRouterDirective,
		DataSetModule,
		PreloaderComponent,
		BBDialogComponent
	]
})
export class BBModule {

	constructor() {
		// PageScrollConfig.defaultDuration = 300;
	}
}
