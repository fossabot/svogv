import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*tslint:disable-next-line*/
import { DataSetModule } from './components/data-set/data-set.module';

// Components
import {
	  AccordionComponent
	, AccordionItemComponent
	, ButtonComponent
	, CtaComponent
	, DescriptionItemComponent
	, DialogComponent
	, FlyOutItemComponent
	, FlyOutComponent
	, IconComponent
	, LinkComponent
	, ListFooterComponent
	, ListHeaderComponent
	, ListItemComponent
	, ListViewComponent
	, MarkerComponent
	, OrderWidgetComponent
	, PictureTextComponent
	, PictureComponent
	, PillComponent
	, PreloaderComponent
	, TabsComponent
	, TextComponent
	, UiSwitchComponent
} from './components/index';

import { LinksToRouterDirective, TooltipDirective, ShowAtDirective } from './directives/index';

// Services
import { WindowSizeService } from './services/window-size.service';

// Pipes
import { 
	  JoinStringsPipe
	, CalculateThresholdPipe
	, OrderByPipe
	, ReverseOrderPipe
	, ShowNumberOfCharsPipe } from './pipes/index';

@NgModule({
	imports: [
		RouterModule,
		CommonModule,
		BrowserModule,
		FormsModule,
		// Module
		ReactiveFormsModule,
  	HttpModule,
		DataSetModule
	],
	declarations: [
		// Components
		CtaComponent,
		PictureComponent,
		PictureTextComponent,
		TextComponent,
		IconComponent,
		ListViewComponent,
		ListItemComponent,
		ListFooterComponent,
		ListHeaderComponent,
		MarkerComponent,
		OrderWidgetComponent,
		LinkComponent,
		UiSwitchComponent,
		FlyOutComponent,
		FlyOutItemComponent,
		DescriptionItemComponent,
		ButtonComponent,
		PillComponent,
		TabsComponent,
		AccordionComponent,
		AccordionItemComponent,
		// Directives & Pipes
		ReverseOrderPipe,
		OrderByPipe,
		JoinStringsPipe,
		CalculateThresholdPipe,
		ShowNumberOfCharsPipe,
		TooltipDirective,
		ShowAtDirective,
		LinksToRouterDirective,
		PreloaderComponent,
		DialogComponent
	],
	entryComponents: [
		DialogComponent
	],
	providers: [
		WindowSizeService
	],
	exports: [
		// Components
		CtaComponent,
		PictureComponent,
		PictureTextComponent,
		TextComponent,
		IconComponent,
		FlyOutComponent,
		FlyOutItemComponent,
		ListViewComponent,
		ListItemComponent,
		ListFooterComponent,
		ListHeaderComponent,
		MarkerComponent,
		OrderWidgetComponent,
		OrderWidgetComponent,
		ButtonComponent,
		PillComponent,
		LinkComponent,
		TabsComponent,
		UiSwitchComponent,
		DescriptionItemComponent,
		AccordionComponent,
		AccordionItemComponent,
		// Directives & Pipes
		ReverseOrderPipe,
		OrderByPipe,
		JoinStringsPipe,
		CalculateThresholdPipe,
		ShowNumberOfCharsPipe,
		TooltipDirective,
		ShowAtDirective,
		LinksToRouterDirective,
		DataSetModule,
		PreloaderComponent,
		DialogComponent
	]
})
export class SvogvBlocksModule {

	constructor() {
	}
}
